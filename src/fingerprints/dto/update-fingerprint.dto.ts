import { PartialType } from '@nestjs/mapped-types';
import { CreateFingerprintDto } from './create-fingerprint.dto.js';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateFingerprintDto extends PartialType(CreateFingerprintDto) {
  @IsMongoId()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  fingerPosition: string;
}
