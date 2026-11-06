import { IsDateString } from 'class-validator';

export class DeviceAttendanceDto {
  @IsDateString()
  timestamp: string;
}
