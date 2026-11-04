import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceService } from './attendance.service.js';
import { AttendanceController } from './attendance.controller.js';
import { AttendanceSchema } from './schema/attendance.schema.js';
import { SessionSchema } from '../sessions/schema/sessions.schema.js';
import { UserSchema } from '../users/schema/user.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Attendance', schema: AttendanceSchema },
      { name: 'Session', schema: SessionSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
