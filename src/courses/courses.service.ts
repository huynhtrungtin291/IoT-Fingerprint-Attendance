import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { Course } from './schema/courses.schema.js';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course')
    private readonly courseModel: Model<Course>,
  ) {}

  async create(dto: CreateCourseDto) {
    const courseCode = dto.courseCode.trim();
    const courseName = dto.courseName.trim();

    const exists = await this.courseModel.exists({ courseCode });
    if (exists) {
      throw new ConflictException('Mã môn học đã tồn tại');
    }

    return this.courseModel.create({ courseCode, courseName });
  }

  async findAll() {
    return this.courseModel.find().sort({ courseCode: 1 }).exec();
  }

  async findOne(id: string) {
    const course = await this.findById(id);

    if (!course) {
      throw new NotFoundException('Môn học không tồn tại');
    }

    return course;
  }

  async update(id: string, dto: UpdateCourseDto) {
    await this.ensureValidId(id);

    const updateData: Partial<UpdateCourseDto> = {};
    if (dto.courseCode !== undefined) {
      updateData.courseCode = dto.courseCode.trim();
    }
    if (dto.courseName !== undefined) {
      updateData.courseName = dto.courseName.trim();
    }

    if (updateData.courseCode) {
      const exists = await this.courseModel.exists({
        courseCode: updateData.courseCode,
        _id: { $ne: id },
      });
      if (exists) {
        throw new ConflictException('Mã môn học đã tồn tại');
      }
    }

    const course = await this.courseModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();

    if (!course) {
      throw new NotFoundException('Môn học không tồn tại');
    }

    return course;
  }

  async remove(id: string) {
    await this.ensureValidId(id);

    const course = await this.courseModel.findByIdAndDelete(id).exec();
    if (!course) {
      throw new NotFoundException('Môn học không tồn tại');
    }

    return {
      message: 'Xóa môn học thành công',
    };
  }

  private async findById(id: string) {
    await this.ensureValidId(id);
    return this.courseModel.findById(id).exec();
  }

  private async ensureValidId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Mã môn học không hợp lệ');
    }
  }
}
