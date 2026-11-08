import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordHasher } from '@nestjs/authentication';
import { Model, Types } from 'mongoose';
import * as XLSX from 'xlsx';

import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdatePasswordDto } from './dto/update-passwrod.dto.js';
import { User } from './schema/user.schema.js';
import { Class } from '../class/schema/class.schema.js';
import { UserRole } from '../common/enum/user.enum.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Class')
    private readonly classModel: Model<Class>,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async createUser(dto: CreateUserDto) {
    const isExists = await this.isUserExist(dto.userName);

    if (isExists) {
      throw new ConflictException('Người dùng đã tồn tại');
    }

    const { password, ...userData } = dto;

    const hashedPassword = await this.hashPassword_RefreshToken(password);

    const createdUser = new this.userModel({
      ...userData,
      passwordHash: hashedPassword,
    });

    await createdUser.save();

    const { passwordHash, refreshToken, ...userWithoutSecrets } =
      createdUser.toObject();

    return {
      statusCode: 201,
      message: 'Tạo người dùng thành công',
      data: userWithoutSecrets,
    };
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    const hashedRefreshToken = refreshToken
      ? await this.hashPassword_RefreshToken(refreshToken)
      : null;

    await this.userModel.findByIdAndUpdate(userId, {
      $set: { refreshToken: hashedRefreshToken },
    });
  }

  async updatePassword(dto: UpdatePasswordDto, userId: string) {
    const user = await this.findUserByUserNameWithPassword(undefined, userId);

    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const isPasswordValid = await this.checkPassword_RefreshToken(
      dto.oldPassword,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Mật khẩu hiện tại không đúng');
    }

    const newPasswordHash = await this.hashPassword_RefreshToken(
      dto.newPassword,
    );

    await this.userModel.findByIdAndUpdate(userId, {
      $set: { passwordHash: newPasswordHash },
    });

    return {
      statusCode: 200,
      message: 'Cập nhật mật khẩu thành công',
    };
  }

  async importStudentsToClass(
    classId: string,
    file: Express.Multer.File,
  ): Promise<{ statusCode: number; message: string; data: unknown[] }> {
    if (!Types.ObjectId.isValid(classId)) {
      throw new BadRequestException('Mã lớp không hợp lệ');
    }

    const classExists = await this.classModel.exists({ _id: classId });
    if (!classExists) {
      throw new NotFoundException('Lớp không tồn tại');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    if (!firstSheet) {
      throw new BadRequestException('File Excel không có sheet dữ liệu');
    }

    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, {
      defval: '',
    });

    if (rows.length === 0) {
      throw new BadRequestException('File Excel không có dữ liệu');
    }

    const students = rows.map((row, index) => {
      const fullName = String(row.fullName ?? '').trim();
      const studentCode = String(row.studentCode ?? '').trim();
      const userName = String(row.userName ?? '').trim() || studentCode;
      const password = String(row.password ?? '').trim() || studentCode;

      if (!fullName || !studentCode) {
        throw new BadRequestException(
          `Dòng ${index + 2} phải có fullName và studentCode`,
        );
      }

      return { fullName, studentCode, userName, password };
    });

    const studentCodes = students.map((student) => student.studentCode);
    const userNames = students.map((student) => student.userName);
    const duplicateStudentCodes = new Set(
      studentCodes.filter(
        (code, index) => studentCodes.indexOf(code) !== index,
      ),
    );
    const duplicateUserNames = new Set(
      userNames.filter((name, index) => userNames.indexOf(name) !== index),
    );

    const existingUsers = await this.userModel
      .find({
        $or: [
          { studentCode: { $in: studentCodes } },
          { userName: { $in: userNames } },
        ],
      })
      .select('studentCode userName')
      .lean()
      .exec();

    for (const student of existingUsers) {
      if (student.studentCode) {
        duplicateStudentCodes.add(student.studentCode);
      }
      duplicateUserNames.add(student.userName);
    }

    if (duplicateStudentCodes.size > 0 || duplicateUserNames.size > 0) {
      throw new ConflictException(
        'File có mã sinh viên hoặc tên đăng nhập đã tồn tại',
      );
    }

    const users = await Promise.all(
      students.map(async ({ password, ...student }) => ({
        ...student,
        role: UserRole.STUDENT,
        classId: new Types.ObjectId(classId),
        passwordHash: await this.hashPassword_RefreshToken(password),
      })),
    );

    const createdUsers = await this.userModel.insertMany(users, {
      ordered: true,
    });

    return {
      statusCode: 201,
      message: `Đã thêm ${createdUsers.length} học sinh vào lớp`,
      data: createdUsers.map(({ passwordHash, ...user }) => user),
    };
  }

  async getAllUser(role: UserRole) {
    return await this.userModel.find({role:role}).exec();
  }

  // Helpers

  async isUserExist(userName?: string, userId?: string): Promise<boolean> {
    if (userName) {
      const result = await this.userModel.exists({ userName });
      return !!result;
    }

    if (userId) {
      const result = await this.userModel.exists({ _id: userId });
      return !!result;
    }

    return false;
  }

  async hashPassword_RefreshToken(password: string) {
    return this.passwordHasher.hash(password);
  }

  async checkPassword_RefreshToken(
    password: string,
    storedHash: string | undefined,
  ) {
    if (!storedHash) {
      return false;
    }

    return this.passwordHasher.verify(password, storedHash);
  }

  async findUserByUserNameWithPassword(userName?: string, userId?: string) {
    if (userName) {
      return this.userModel
        .findOne({ userName })
        .select('+passwordHash')
        .exec();
    }

    if (userId) {
      return this.userModel.findById(userId).select('+passwordHash').exec();
    }

    return null;
  }

  async finUserByUserNameWithRefreshToken(userName: string) {
    return this.userModel.findOne({ userName }).select('+refreshToken').exec();
  }

  async findUserByUserName(userName: string) {
    return this.userModel.findOne({ userName }).exec();
  }
}
