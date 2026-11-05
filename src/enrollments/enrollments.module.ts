import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentsService } from './enrollments.service.js';
import { EnrollmentsController } from './enrollments.controller.js';
import { EnrollmentSchema } from './schema/enrollments.schema.js';
import { SectionSchema } from '../sections/schema/sections.schema.js';
import { UserSchema } from '../users/schema/user.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Enrollment', schema: EnrollmentSchema },
      { name: 'Section', schema: SectionSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
