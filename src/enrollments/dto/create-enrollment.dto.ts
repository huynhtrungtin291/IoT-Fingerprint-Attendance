import { IsDateString, IsMongoId, IsOptional } from 'class-validator';

export class CreateEnrollmentDto {
  @IsMongoId()
  sectionId: string;

  @IsMongoId()
  studentId: string;

  @IsMongoId()
  addedBy: string;

  @IsOptional()
  @IsDateString()
  addedAt?: string;
}
