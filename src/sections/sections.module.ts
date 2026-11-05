import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionsService } from './sections.service.js';
import { SectionsController } from './sections.controller.js';
import { SectionSchema } from './schema/sections.schema.js';
import { CourseSchema } from '../courses/schema/courses.schema.js';
import { UserSchema } from '../users/schema/user.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Section', schema: SectionSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService],
})
export class SectionsModule {}
