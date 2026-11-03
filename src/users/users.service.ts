import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema.js';
import { PasswordHasher } from '@nestjs/authentication';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const isExists = await this.isUserExist(createUserDto.userName);
    if (isExists == true) {
      return {
        statuscode: '409',
        message: 'Người dùng đã tồn tại',
      };
    }

    const hashedPassword = await this.hashPassword_RefreshToken(
      createUserDto.password,
    );

    const createdUser = new this.userModel({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
    await createdUser.save();

    const { passwordHash, ...userWithoutPassword } = createdUser.toObject();

    return {
      statusCode: '201',
      message: 'Tạo người dùng thành công',
      data: userWithoutPassword,
    };
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = refreshToken
      ? await this.hashPassword_RefreshToken(refreshToken)
      : null;
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  // --hepler
  async isUserExist(userName: string): Promise<boolean> {
    const result = await this.userModel.exists({ userName });
    return !!result;
  }

  async hashPassword_RefreshToken(password: string) {
    return this.passwordHasher.hash(password);
  }

  async checkPassword_RefreshToken(
    password: string,
    storedHash: string | undefined,
  ) {
    return this.passwordHasher.verify(password, storedHash);
  }

  async findUserByUserNameWithPassword(userName: string) {
    const user = await this.userModel
      .findOne({ userName })
      .select('+passwordHash')
      .exec();
    return user;
  }

  async finUserByUserNameWithRefreshToken(userName: string) {
    const user = await this.userModel
      .findOne({ userName })
      .select('+refreshToken')
      .exec();
    return user;
  }

  async findUserByUserName(userName: string) {
    const user = await this.userModel.findOne({ userName }).exec();
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
