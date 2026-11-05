import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordHasher } from '@nestjs/authentication';
import { DevicesService } from './devices.service.js';
import { DevicesController } from './devices.controller.js';
import { DeviceSchema } from './schema/devices.schema.js';
import { RoomSchema } from '../rooms/schema/rooms.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Device', schema: DeviceSchema },
      { name: 'Room', schema: RoomSchema },
    ]),
  ],
  controllers: [DevicesController],
  providers: [DevicesService, PasswordHasher],
})
export class DevicesModule {}
