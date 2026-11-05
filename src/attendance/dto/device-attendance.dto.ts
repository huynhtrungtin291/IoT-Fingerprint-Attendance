import { IsDateString, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DeviceAttendanceDto {
  @IsString()
  @IsNotEmpty()
  deviceCode: string;

  @IsString()
  @IsNotEmpty()
  authSecret: string;

  @IsString()
  @IsNotEmpty()
  templateData: string;

  @IsDateString()
  timestamp: string;
}
