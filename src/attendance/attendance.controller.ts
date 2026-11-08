import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service.js';
import { CreateAttendanceDto } from './dto/create-attendance.dto.js';
import { UpdateAttendanceDto } from './dto/update-attendance.dto.js';
import { DeviceAttendanceDto } from './dto/device-attendance.dto.js';
import { DeviceSessionTemplatesDto } from './dto/device-session-templates.dto.js';
import { DeviceCheckInDto } from './dto/device-check-in.dto.js';
import { Public } from '@nestjs/authentication';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated.request.interface.js';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('create')
  create(@Body() dto: CreateAttendanceDto) {
    return this.attendanceService.create(dto);
  }

  @Public()
  @Post('device/sessions')
  findSessionsForDevice(
    @Body() dto: DeviceAttendanceDto,
    @Headers('x-device-code') deviceCode: string | undefined,
    @Headers('x-device-secret') deviceSecret: string | undefined,
  ) {
    return this.attendanceService.findSessionsForDevice(
      dto,
      deviceCode ?? '',
      deviceSecret ?? '',
    );
  }

  @Public()
  @Post('device/session-templates')
  findSessionTemplatesForDevice(
    @Body() dto: DeviceSessionTemplatesDto,
    @Headers('x-device-code') deviceCode: string | undefined,
    @Headers('x-device-secret') deviceSecret: string | undefined,
  ) {
    return this.attendanceService.findSessionTemplatesForDevice(
      dto,
      deviceCode ?? '',
      deviceSecret ?? '',
    );
  }

  @Public()
  @Post('device/check-in')
  checkInFromDevice(
    @Body() dto: DeviceCheckInDto,
    @Headers('x-device-code') deviceCode: string | undefined,
    @Headers('x-device-secret') deviceSecret: string | undefined,
  ) {
    return this.attendanceService.checkInFromDevice(
      dto,
      deviceCode ?? '',
      deviceSecret ?? '',
    );
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get('teacher')
  getAttendance(@Req() req: AuthenticatedRequest) {
    return this.attendanceService.getAttendanceByTeacher(req.user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAttendanceDto) {
    return this.attendanceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(id);
  }
}
