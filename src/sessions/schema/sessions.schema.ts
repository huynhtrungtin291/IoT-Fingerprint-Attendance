import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum SessionStatus {
  SCHEDULED = 'scheduled',
  OPEN = 'open',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export type SessionDocument = HydratedDocument<Session>;

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Section' })
  sectionId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Room' })
  roomId: Types.ObjectId;

  @Prop({
    required: true,
    enum: Object.values(SessionStatus),
    type: String,
    default: SessionStatus.SCHEDULED,
  })
  status: SessionStatus;

  @Prop({ required: true, type: Date })
  startTime: Date;

  @Prop({ required: true, type: Date })
  endTime: Date;

  @Prop({ type: Date })
  attendanceOpenTime?: Date;

  @Prop({ type: Date })
  attendanceCloseTime?: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
SessionSchema.index({ sectionId: 1, startTime: 1 }, { unique: true });
