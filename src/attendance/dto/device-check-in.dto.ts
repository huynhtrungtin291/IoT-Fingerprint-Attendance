import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class DeviceCheckInDto {
  @IsMongoId()
  sessionId: string;

  @IsDateString()
  timestamp: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  templates: string[];
}
