import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../../common/enum/user.enum.js';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @ValidateIf((dto: CreateUserDto) => dto.role === UserRole.STUDENT)
  @IsString()
  @IsNotEmpty()
  studentCode?: string;

  @ValidateIf((dto: CreateUserDto) => dto.role === UserRole.STUDENT)
  @IsMongoId()
  classId?: string;
}
