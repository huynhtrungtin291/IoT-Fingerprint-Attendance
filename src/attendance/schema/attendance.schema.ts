import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum AttendanceStatus {
  ABSENT = 'absent',
  LATE = 'late',
  PRESENT = 'present',
}

export enum AttendanceMethod {
  FINGERPRINT = 'fingerprint',
  MANUAL = 'manual',
}

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Session' })
  sessionId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  studentId: Types.ObjectId;

  @Prop({ type: Date, default: null })
  checkInTime: Date | null;

  @Prop({
    required: true,
    enum: Object.values(AttendanceStatus),
    type: String,
  })
  status: AttendanceStatus;

  @Prop({ trim: true })
  deviceId?: string;

  @Prop({
    required: true,
    enum: Object.values(AttendanceMethod),
    type: String,
  })
  method: AttendanceMethod;

  @Prop({ required: true, type: Date, default: Date.now })
  receivedAt: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
AttendanceSchema.index({ sessionId: 1, studentId: 1 }, { unique: true });
