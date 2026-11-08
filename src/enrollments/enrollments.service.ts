import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRole } from '../common/enum/user.enum.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { CreateEnrollmentsByClassDto } from './dto/create-enrollments-by-class.dto.js';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto.js';
import { Enrollment } from './schema/enrollments.schema.js';
import { Section } from '../sections/schema/sections.schema.js';
import { User } from '../users/schema/user.schema.js';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel('Enrollment')
    private readonly enrollmentModel: Model<Enrollment>,
    @InjectModel('Section')
    private readonly sectionModel: Model<Section>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async create(dto: CreateEnrollmentDto) {
    await this.ensureReferences(dto.sectionId, dto.studentId, dto.addedBy);
    const exists = await this.enrollmentModel.exists({
      sectionId: dto.sectionId,
      studentId: dto.studentId,
    });
    if (exists) {
      throw new ConflictException('Sinh viên đã có trong lớp học phần');
    }

    return this.enrollmentModel.create({
      sectionId: new Types.ObjectId(dto.sectionId),
      studentId: new Types.ObjectId(dto.studentId),
      addedBy: new Types.ObjectId(dto.addedBy),
      addedAt: dto.addedAt ? new Date(dto.addedAt) : new Date(),
    });
  }

  async createByClass(dto: CreateEnrollmentsByClassDto, addId: string) {
    const { sectionId, classId } = dto;
    const addedBy = new Types.ObjectId(addId);

    if (
      !Types.ObjectId.isValid(sectionId) ||
      !Types.ObjectId.isValid(classId) ||
      !Types.ObjectId.isValid(addedBy)
    ) {
      throw new BadRequestException('Mã tham chiếu không hợp lệ');
    }

    if (!(await this.sectionModel.exists({ _id: sectionId }))) {
      throw new NotFoundException('Lớp học phần không tồn tại');
    }

    if (!(await this.userModel.exists({ _id: addedBy }))) {
      throw new NotFoundException('Người thêm sinh viên không tồn tại');
    }

    const students = await this.userModel
      .find({
        classId: new Types.ObjectId(classId),
        role: UserRole.STUDENT,
      })
      .select('_id')
      .lean()
      .exec();

    if (students.length === 0) {
      throw new NotFoundException('Lớp không có sinh viên');
    }

    const studentIds = students.map((student) => student._id);
    const existingEnrollments = await this.enrollmentModel
      .find({
        sectionId: new Types.ObjectId(sectionId),
        studentId: { $in: studentIds },
      })
      .select('studentId')
      .lean()
      .exec();

    const existingStudentIds = new Set(
      existingEnrollments.map((enrollment) => enrollment.studentId.toString()),
    );
    const newEnrollments = students
      .filter((student) => !existingStudentIds.has(student._id.toString()))
      .map((student) => ({
        sectionId: new Types.ObjectId(sectionId),
        studentId: student._id,
        addedBy: new Types.ObjectId(addedBy),
        addedAt: new Date(),
      }));

    if (newEnrollments.length > 0) {
      await this.enrollmentModel.insertMany(newEnrollments);
    }

    return {
      message: 'Thêm sinh viên vào lớp học phần thành công',
      totalStudents: students.length,
      addedCount: newEnrollments.length,
      skippedCount: existingEnrollments.length,
    };
  }

  async findAll() {
    return this.enrollmentModel
      .find()
      .populate('sectionId', 'sectionCode courseId teacherId')
      .populate('studentId', 'fullName userName studentCode')
      .populate('addedBy', 'fullName userName role')
      .sort({ addedAt: -1 })
      .exec();
  }

  async getAllEnrollmentWithUserId(id: string) {
    await this.ensureValidId(id);

    const enrollments = await this.enrollmentModel
      .find()
      .populate({
        path: 'sectionId',
        match: { teacherId: new Types.ObjectId(id) },
        select: 'sectionCode courseId teacherId',
      })
      .populate('studentId', 'fullName userName studentCode')
      .populate('addedBy', 'fullName userName role')
      .sort({ addedAt: -1 })
      .exec();

    return enrollments.filter((enrollment) => enrollment.sectionId !== null);
  }

  async update(id: string, dto: UpdateEnrollmentDto) {
    await this.ensureValidId(id);
    const current = await this.enrollmentModel.findById(id).lean().exec();
    if (!current) {
      throw new NotFoundException('Bản ghi đăng ký không tồn tại');
    }

    const sectionId = dto.sectionId ?? current.sectionId.toString();
    const studentId = dto.studentId ?? current.studentId.toString();
    const addedBy = dto.addedBy ?? current.addedBy.toString();
    await this.ensureReferences(sectionId, studentId, addedBy);

    const duplicate = await this.enrollmentModel.exists({
      _id: { $ne: id },
      sectionId,
      studentId,
    });
    if (duplicate) {
      throw new ConflictException('Sinh viên đã có trong lớp học phần');
    }

    const enrollment = await this.enrollmentModel
      .findByIdAndUpdate(
        id,
        {
          sectionId: new Types.ObjectId(sectionId),
          studentId: new Types.ObjectId(studentId),
          addedBy: new Types.ObjectId(addedBy),
          ...(dto.addedAt && { addedAt: new Date(dto.addedAt) }),
        },
        { new: true, runValidators: true },
      )
      .populate('sectionId', 'sectionCode courseId teacherId')
      .populate('studentId', 'fullName userName studentCode')
      .populate('addedBy', 'fullName userName role')
      .exec();
    if (!enrollment) {
      throw new NotFoundException('Bản ghi đăng ký không tồn tại');
    }
    return enrollment;
  }

  async remove(id: string) {
    await this.ensureValidId(id);
    const enrollment = await this.enrollmentModel.findByIdAndDelete(id).exec();
    if (!enrollment) {
      throw new NotFoundException('Bản ghi đăng ký không tồn tại');
    }
    return { message: 'Xóa đăng ký thành công' };
  }

  private async ensureReferences(
    sectionId: string,
    studentId: string,
    addedBy: string,
  ) {
    if (
      !Types.ObjectId.isValid(sectionId) ||
      !Types.ObjectId.isValid(studentId) ||
      !Types.ObjectId.isValid(addedBy)
    ) {
      throw new BadRequestException('Mã tham chiếu không hợp lệ');
    }
    if (!(await this.sectionModel.exists({ _id: sectionId }))) {
      throw new NotFoundException('Lớp học phần không tồn tại');
    }
    if (
      !(await this.userModel.exists({ _id: studentId, role: UserRole.STUDENT }))
    ) {
      throw new NotFoundException(
        'Sinh viên không tồn tại hoặc không có vai trò student',
      );
    }
    if (!(await this.userModel.exists({ _id: addedBy }))) {
      throw new NotFoundException('Người thêm sinh viên không tồn tại');
    }
  }

  private async ensureValidId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Mã đăng ký không hợp lệ');
    }
  }
}
