import { PartialType } from '@nestjs/mapped-types';
import { CreateFingerprintDto } from './create-fingerprint.dto.js';

export class UpdateFingerprintDto extends PartialType(CreateFingerprintDto) {}
