import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClassService } from './class.service.js';
import { CreateClassDto } from './dto/create-class.dto.js';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('create')
  create(@Body() dto: CreateClassDto) {
    return this.classService.createClass(dto);
  }

  @Get('all')
  getAllClass() {
    return this.classService.getAllClasses();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
