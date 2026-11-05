import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FingerprintsService } from './fingerprints.service.js';
import { CreateFingerprintDto } from './dto/create-fingerprint.dto.js';
import { UpdateFingerprintDto } from './dto/update-fingerprint.dto.js';

@Controller('fingerprints')
export class FingerprintsController {
  constructor(private readonly fingerprintsService: FingerprintsService) {}

  @Post('create')
  create(@Body() dto: CreateFingerprintDto) {
    return this.fingerprintsService.create(dto);
  }

  @Get()
  findAll() {
    return this.fingerprintsService.findAll();
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
