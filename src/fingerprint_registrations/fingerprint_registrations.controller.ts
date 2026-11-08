import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  HttpStatus,
  Delete,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Public } from '@nestjs/authentication';
import type { Response } from 'express';
import { FingerprintRegistrationsService } from './fingerprint_registrations.service.js';
import { CreateFingerprintRegistrationDto } from './dto/create-fingerprint-registration.dto.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { UserRole } from '../common/enum/user.enum.js';
import { RolesGuard } from '../common/guards/roles.guard.js';

@Controller()
export class FingerprintRegistrationsController {
  constructor(private readonly fingerprintRegistrationsService: FingerprintRegistrationsService) {}

  @Post('fingerprint-registrations/create')
  @Roles(UserRole.TEACHER)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateFingerprintRegistrationDto) {
    return this.fingerprintRegistrationsService.create(dto);
  }

  @Get('fingerprint-registrations/all')
  getAllRegistrations() {
    return this.fingerprintRegistrationsService.getAllRegistrations();
  }

  @Get('fingerprint-registrations/all/class/:classId')
  getAllRegistrationsWithClass(@Param('classId') classId: string) {
    return this.fingerprintRegistrationsService.getAllRegistrationsWithClass(
      classId,
    );
  }

  @Delete('fingerprint-registrations/:id')
  @Roles(UserRole.TEACHER)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.fingerprintRegistrationsService.remove(id);
  }

  @Public()
  @Get('devices/me/pending-registration')
  @HttpCode(HttpStatus.OK)
  async findPendingForDevice(
    @Headers('x-device-code') deviceCode: string | undefined,
    @Headers('x-device-secret') deviceSecret: string | undefined,
    @Res({ passthrough: true }) response: Response,
  ) {
    const registration = await this.fingerprintRegistrationsService.findPendingForDevice(
      deviceCode ?? '',
      deviceSecret ?? '',
    );
    if (!registration) {
      response.status(HttpStatus.NO_CONTENT);
      return;
    }
    return registration;
  }
}
