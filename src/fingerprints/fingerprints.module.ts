import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FingerprintsService } from './fingerprints.service.js';
import { FingerprintsController } from './fingerprints.controller.js';
import { FingerprintSchema } from './schema/fingerprints.schema.js';
import { UserSchema } from '../users/schema/user.schema.js';
import { FingerprintRegistrationSchema } from '../fingerprint_registrations/schema/fingerprint_registrations.schema.js';
import { DeviceSchema } from '../devices/schema/devices.schema.js';
import { PasswordHasher } from '@nestjs/authentication';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Fingerprint', schema: FingerprintSchema },
      { name: 'User', schema: UserSchema },
      { name: 'FingerprintRegistration', schema: FingerprintRegistrationSchema },
      { name: 'Device', schema: DeviceSchema },
    ]),
  ],
  controllers: [FingerprintsController],
  providers: [FingerprintsService, PasswordHasher],
})
export class FingerprintsModule {}
