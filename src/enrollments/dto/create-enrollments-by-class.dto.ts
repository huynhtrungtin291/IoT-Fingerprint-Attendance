import { IsMongoId } from 'class-validator';

export class CreateEnrollmentsByClassDto {
  @IsMongoId()
  sectionId: string;

  @IsMongoId()
  classId: string;

}
