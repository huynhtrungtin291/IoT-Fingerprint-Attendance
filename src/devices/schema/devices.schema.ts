import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum DeviceStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  MAINTENANCE = 'maintenance',
}

export type DeviceDocument = HydratedDocument<Device>;

@Schema({ timestamps: true })
export class Device {
  @Prop({ required: true, unique: true, trim: true })
  deviceCode: string;

  @Prop({ required: true, trim: true })
  deviceName: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Room' })
  roomId: Types.ObjectId;

  @Prop({
    required: true,
    enum: Object.values(DeviceStatus),
    type: String,
    default: DeviceStatus.ACTIVE,
  })
  status: DeviceStatus;

  @Prop({ required: true, select: false })
  authSecretHash: string;

  @Prop({ type: Date })
  lastSeenAt?: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
