import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SectionDocument = HydratedDocument<Section>;

@Schema({ timestamps: true })
export class Section {
  @Prop({ required: true, unique: true, trim: true })
  sectionCode: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Course' })
  courseId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  teacherId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  academicYear: string;

  @Prop({ required: true, enum: [1, 2, 3], type: Number })
  term: number;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
