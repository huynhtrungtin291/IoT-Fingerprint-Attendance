import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  courseCode: string;

  @IsString()
  @IsNotEmpty()
  courseName: string;
}
