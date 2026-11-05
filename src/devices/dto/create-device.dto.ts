import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { DeviceStatus } from '../schema/devices.schema.js';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  deviceCode: string;

  @IsString()
  @IsNotEmpty()
  deviceName: string;

  @IsMongoId()
  roomId: string;

  @IsOptional()
  @IsEnum(DeviceStatus)
  status?: DeviceStatus;

  @IsString()
  @IsNotEmpty()
  authSecret: string;

  @IsOptional()
  @IsDateString()
  lastSeenAt?: string;
}
