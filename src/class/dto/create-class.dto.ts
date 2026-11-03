import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  classCode: string;

  @IsString()
  @IsNotEmpty()
  className: string;
}