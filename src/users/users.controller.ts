import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdatePasswordDto } from './dto/update-passwrod.dto.js';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated.request.interface.js';
import { Public } from '@nestjs/authentication';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('create')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Patch('updatePassword')
  updatePassword(
    @Body() dto: UpdatePasswordDto,
    @Req() req: AuthenticatedRequest,
  ) {
    console.log('_id', req.user._id, typeof req.user._id);
    return this.usersService.updatePassword(dto, req.user._id);
  }

  @Post(':classId/import')
  @UseInterceptors(FileInterceptor('file'))
  importStudents(
    @Param('classId') classId: string,
    @UploadedFile() file: Express.Multer.File,
    
  ) {
    if (!file) {
      throw new BadRequestException('Vui lòng gửi file Excel');
    }

    return this.usersService.importStudentsToClass(classId, file);
  }

}
