import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './schema/class.schema.js';
import { CreateClassDto } from './dto/create-class.dto.js';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel('Class')
    private readonly classModel: Model<Class>,
  ) {}

  async createClass(dto: CreateClassDto) {
    const exists = await this.classModel.exists({
      classCode: dto.classCode,
    });

    if (exists) {
      throw new ConflictException('Mã lớp đã tồn tại');
    }

    return this.classModel.create(dto);
  }

  async remove(id: string) {
    const classData = await this.classModel.findByIdAndDelete(id).exec();

    if (!classData) {
      throw new NotFoundException('Lớp không tồn tại');
    }

    return {
      message: 'Xóa lớp thành công',
    };
  }
  
}