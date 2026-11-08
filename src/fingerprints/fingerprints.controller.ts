import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from '@nestjs/authentication';
import { FingerprintsService } from './fingerprints.service.js';
import { CreateFingerprintDto } from './dto/create-fingerprint.dto.js';
import { UpdateFingerprintDto } from './dto/update-fingerprint.dto.js';

@Controller('fingerprints')
export class FingerprintsController {
  constructor(private readonly fingerprintsService: FingerprintsService) {}

  @Public()
  @Post('create')
  create(
    @Body() dto: CreateFingerprintDto,
    @Headers('x-device-code') deviceCode: string | undefined,
    @Headers('x-device-secret') deviceSecret: string | undefined,
  ) {
    return this.fingerprintsService.create(
      dto,
      deviceCode ?? '',
      deviceSecret ?? '',
    );
  }

  @Get('all')
  getAllFingerprint() {
    return this.fingerprintsService.getAllFingerprint();
  }

  @Get('class/all/:classId')
  getAllFingerprintWithClass(@Param('classId') classId: string) {
    return this.fingerprintsService.getAllFingerprintWithClass(classId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fingerprintsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFingerprintDto) {
    return this.fingerprintsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fingerprintsService.remove(id);
  }
}
