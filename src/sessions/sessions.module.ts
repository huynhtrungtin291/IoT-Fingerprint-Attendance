import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionsService } from './sessions.service.js';
import { SessionsController } from './sessions.controller.js';
import { SessionSchema } from './schema/sessions.schema.js';
import { SectionSchema } from '../sections/schema/sections.schema.js';
import { RoomSchema } from '../rooms/schema/rooms.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Session', schema: SessionSchema },
      { name: 'Section', schema: SectionSchema },
      { name: 'Room', schema: RoomSchema },
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
