import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from './rooms.service.js';
import { RoomsController } from './rooms.controller.js';
import { RoomSchema } from './schema/rooms.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
