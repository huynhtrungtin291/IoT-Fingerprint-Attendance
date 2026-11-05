import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
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

  @Post('fingerprint-registrations')
  @Roles(UserRole.TEACHER)
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateFingerprintRegistrationDto) {
    return this.fingerprintRegistrationsService.create(dto);
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
