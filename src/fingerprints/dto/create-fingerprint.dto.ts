import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { FingerprintStatus } from '../schema/fingerprints.schema.js';

export class CreateFingerprintDto {
  

  @IsString()
  @IsNotEmpty()
  registrationId: string;

 

  @IsString()
  @IsNotEmpty()
  templateData: string;

  @IsString()
  @IsNotEmpty()
  templateFormat: string;

  @IsString()
  @IsNotEmpty()
  algorithmVersion: string;

  @IsOptional()
  @IsEnum(FingerprintStatus)
  status?: FingerprintStatus;
}
