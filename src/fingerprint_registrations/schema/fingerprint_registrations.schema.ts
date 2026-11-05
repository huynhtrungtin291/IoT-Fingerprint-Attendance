import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum FingerprintRegistrationStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  EXPIRED = 'expired',
}

export type FingerprintRegistrationDocument =
  HydratedDocument<FingerprintRegistration>;

@Schema({ timestamps: true })
export class FingerprintRegistration {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  studentId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Device' })
  deviceId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  fingerPosition: string;

  @Prop({
    required: true,
    enum: Object.values(FingerprintRegistrationStatus),
    type: String,
    default: FingerprintRegistrationStatus.PENDING,
  })
  status: FingerprintRegistrationStatus;

  @Prop({ required: true, type: Date })
  expiresAt: Date;
}

export const FingerprintRegistrationSchema =
  SchemaFactory.createForClass(FingerprintRegistration);

FingerprintRegistrationSchema.index({ deviceId: 1, status: 1, expiresAt: 1 });
