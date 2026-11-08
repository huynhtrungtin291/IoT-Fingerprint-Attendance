import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';
import { CreateEnrollmentsByClassDto } from './dto/create-enrollments-by-class.dto.js';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto.js';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated.request.interface.js';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post('create')
  create(@Body() dto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(dto);
  }

  @Post('create-by-class')
  createByClass(
    @Body() dto: CreateEnrollmentsByClassDto,
    @Req() req: AuthenticatedRequest) {
    return this.enrollmentsService.createByClass(dto, req.user._id);
  }

  @Get()
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get('all')
  getAllEnrollmentWithUserId(@Req() req: AuthenticatedRequest) {
    return this.enrollmentsService.getAllEnrollmentWithUserId(req.user._id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(id);
  }
}
