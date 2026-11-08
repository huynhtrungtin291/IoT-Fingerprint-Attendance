import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRole } from '../common/enum/user.enum.js';
import { CreateSectionDto } from './dto/create-section.dto.js';
import { UpdateSectionDto } from './dto/update-section.dto.js';
import { Section } from './schema/sections.schema.js';
import { Course } from '../courses/schema/courses.schema.js';
import { User } from '../users/schema/user.schema.js';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel('Section')
    private readonly sectionModel: Model<Section>,
    @InjectModel('Course')
    private readonly courseModel: Model<Course>,
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async create(dto: CreateSectionDto) {
    const sectionCode = dto.sectionCode.trim();
    await this.ensureReferences(dto.courseId, dto.teacherId);

    const exists = await this.sectionModel.exists({ sectionCode });
    if (exists) {
      throw new ConflictException('Mã lớp học phần đã tồn tại');
    }

    return this.sectionModel.create({
      sectionCode,
      courseId: new Types.ObjectId(dto.courseId),
      teacherId: new Types.ObjectId(dto.teacherId),
      academicYear: dto.academicYear.trim(),
      term: dto.term,
    });
  }

  async getAllSectionWithUserId(userId: string) {
    console.log('TeacherID', userId);
    return this.sectionModel
      .find({ teacherId: new Types.ObjectId(userId) })
      .populate('courseId', 'courseCode courseName')
      .populate('teacherId', 'fullName userName')
      .sort({ sectionCode: 1 })
      .exec();
  }

  async findOne(id: string) {
    await this.ensureValidId(id);
    const section = await this.sectionModel
      .findById(id)
      .populate('courseId', 'courseCode courseName')
      .populate('teacherId', 'fullName userName')
      .exec();

    if (!section) {
      throw new NotFoundException('Lớp học phần không tồn tại');
    }

    return section;
  }

  async update(id: string, dto: UpdateSectionDto) {
    await this.ensureValidId(id);

    if (dto.courseId !== undefined || dto.teacherId !== undefined) {
      const current = await this.sectionModel.findById(id).lean().exec();
      if (!current) {
        throw new NotFoundException('Lớp học phần không tồn tại');
      }

      await this.ensureReferences(
        dto.courseId ?? current.courseId.toString(),
        dto.teacherId ?? current.teacherId.toString(),
      );
    }

    const updateData: Record<string, unknown> = {};
    if (dto.sectionCode !== undefined) {
      updateData.sectionCode = dto.sectionCode.trim();
    }
    if (dto.courseId !== undefined) {
      updateData.courseId = new Types.ObjectId(dto.courseId);
    }
    if (dto.teacherId !== undefined) {
      updateData.teacherId = new Types.ObjectId(dto.teacherId);
    }
    if (dto.academicYear !== undefined) {
      updateData.academicYear = dto.academicYear.trim();
    }

    if (updateData.sectionCode) {
      const exists = await this.sectionModel.exists({
        sectionCode: updateData.sectionCode,
        _id: { $ne: id },
      });
      if (exists) {
        throw new ConflictException('Mã lớp học phần đã tồn tại');
      }
    }

    const section = await this.sectionModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .populate('courseId', 'courseCode courseName')
      .populate('teacherId', 'fullName userName')
      .exec();

    if (!section) {
      throw new NotFoundException('Lớp học phần không tồn tại');
    }

    return section;
  }

  async remove(id: string) {
    await this.ensureValidId(id);
    const section = await this.sectionModel.findByIdAndDelete(id).exec();

    if (!section) {
      throw new NotFoundException('Lớp học phần không tồn tại');
    }

    return {
      message: 'Xóa lớp học phần thành công',
    };
  }

  private async ensureReferences(courseId: string, teacherId: string) {
    const courseExists = await this.courseModel.exists({ _id: courseId });
    if (!courseExists) {
      throw new NotFoundException('Môn học không tồn tại');
    }

    const teacherExists = await this.userModel.exists({
      _id: teacherId,
      role: UserRole.TEACHER,
    });
    if (!teacherExists) {
      throw new NotFoundException(
        'Giảng viên không tồn tại hoặc không có vai trò teacher',
      );
    }
  }

  private async ensureValidId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Mã lớp học phần không hợp lệ');
    }
  }
}
