import { IsDateString, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { SessionStatus } from '../schema/sessions.schema.js';

export class CreateSessionDto {
  @IsMongoId()
  sectionId: string;

  @IsMongoId()
  roomId: string;

  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsDateString()
  attendanceOpenTime?: string;

  @IsOptional()
  @IsDateString()
  attendanceCloseTime?: string;
}
