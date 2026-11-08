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

}
