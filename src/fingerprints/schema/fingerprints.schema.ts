import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum FingerprintStatus {
  ACTIVE = 'active',
  REVOKED = 'revoked',
}

export type FingerprintDocument = HydratedDocument<Fingerprint>;

@Schema({ timestamps: true })
export class Fingerprint {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  studentId: Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'FingerprintRegistration',
  })
  registrationId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  fingerPosition: string;

  @Prop({ required: true })
  templateData: string;

  @Prop({ required: true, trim: true })
  templateFormat: string;

  @Prop({ required: true, trim: true })
  algorithmVersion: string;

  @Prop({
    required: true,
    enum: Object.values(FingerprintStatus),
    type: String,
    default: FingerprintStatus.ACTIVE,
  })
  status: FingerprintStatus;
}

export const FingerprintSchema = SchemaFactory.createForClass(Fingerprint);
FingerprintSchema.index({ studentId: 1, fingerPosition: 1 }, { unique: true });
