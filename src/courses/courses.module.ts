import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from './courses.service.js';
import { CoursesController } from './courses.controller.js';
import { CourseSchema } from './schema/courses.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
