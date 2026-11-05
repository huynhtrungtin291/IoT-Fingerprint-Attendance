import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateFingerprintRegistrationDto {
  @IsMongoId()
  studentId: string;

  @IsMongoId()
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  fingerPosition: string;
}
