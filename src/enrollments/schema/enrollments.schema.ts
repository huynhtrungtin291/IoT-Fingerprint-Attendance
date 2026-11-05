import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EnrollmentDocument = HydratedDocument<Enrollment>;

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Section' })
  sectionId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  studentId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  addedBy: Types.ObjectId;

  @Prop({ required: true, type: Date, default: Date.now })
  addedAt: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
EnrollmentSchema.index({ sectionId: 1, studentId: 1 }, { unique: true });
