import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  sectionCode: string;

  @IsMongoId()
  courseId: string;

  @IsMongoId()
  teacherId: string;

  @IsString()
  @IsNotEmpty()
  academicYear: string;

  @IsInt()
  @Min(1)
  @Max(3)
  term: number;
}
