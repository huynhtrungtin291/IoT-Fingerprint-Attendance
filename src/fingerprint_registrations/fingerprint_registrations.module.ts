import { Module } from '@nestjs/common';
import { FingerprintRegistrationsService } from './fingerprint_registrations.service.js';
import { FingerprintRegistrationsController } from './fingerprint_registrations.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordHasher } from '@nestjs/authentication';
import { FingerprintRegistrationSchema } from './schema/fingerprint_registrations.schema.js';
import { UserSchema } from '../users/schema/user.schema.js';
import { DeviceSchema } from '../devices/schema/devices.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FingerprintRegistration', schema: FingerprintRegistrationSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Device', schema: DeviceSchema },
    ]),
  ],
  controllers: [FingerprintRegistrationsController],
  providers: [FingerprintRegistrationsService, PasswordHasher],
})
export class FingerprintRegistrationsModule {}
