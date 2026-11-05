import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true, trim: true })
  roomCode: string;

  @Prop({ required: true, trim: true })
  building: string;

  @Prop({ required: true, trim: true })
  campus: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
RoomSchema.index({ roomCode: 1, campus: 1 }, { unique: true });
