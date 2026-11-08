import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceService } from './attendance.service.js';
import { AttendanceController } from './attendance.controller.js';
import { AttendanceSchema } from './schema/attendance.schema.js';
import { SessionSchema } from '../sessions/schema/sessions.schema.js';
import { SectionSchema } from '../sections/schema/sections.schema.js';
import { UserSchema } from '../users/schema/user.schema.js';
import { DeviceSchema } from '../devices/schema/devices.schema.js';
import { FingerprintSchema } from '../fingerprints/schema/fingerprints.schema.js';
import { EnrollmentSchema } from '../enrollments/schema/enrollments.schema.js';
import { PasswordHasher } from '@nestjs/authentication';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Attendance', schema: AttendanceSchema },
      { name: 'Session', schema: SessionSchema },
      { name: 'Section', schema: SectionSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Device', schema: DeviceSchema },
      { name: 'Fingerprint', schema: FingerprintSchema },
      { name: 'Enrollment', schema: EnrollmentSchema },
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, PasswordHasher],
})
export class AttendanceModule {}
