import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  AttendanceMethod,
  AttendanceStatus,
} from '../schema/attendance.schema.js';

export class CreateAttendanceDto {
  @IsMongoId()
  sessionId: string;

  @IsMongoId()
  studentId: string;

  @IsOptional()
  @IsDateString()
  checkInTime?: string | null;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsEnum(AttendanceMethod)
  method: AttendanceMethod;

  @IsOptional()
  @IsDateString()
  receivedAt?: string;
}
