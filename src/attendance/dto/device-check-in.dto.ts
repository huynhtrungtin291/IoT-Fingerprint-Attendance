import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DeviceMatchedTemplateDto {
  @IsString()
  @IsNotEmpty()
  template: string;

  @IsDateString()
  timestamp: string;
}

export class DeviceCheckInDto {
  @IsMongoId()
  sessionId: string;


  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DeviceMatchedTemplateDto)
  templates: DeviceMatchedTemplateDto[];
}
