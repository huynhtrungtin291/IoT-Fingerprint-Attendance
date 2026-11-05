import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FingerprintsService } from './fingerprints.service.js';
import { FingerprintsController } from './fingerprints.controller.js';
import { FingerprintSchema } from './schema/fingerprints.schema.js';
import { UserSchema } from '../users/schema/user.schema.js';
import { PasswordHasher } from '@nestjs/authentication';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Fingerprint', schema: FingerprintSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [FingerprintsController],
  providers: [FingerprintsService, PasswordHasher],
})
export class FingerprintsModule {}
