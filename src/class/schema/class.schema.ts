import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClassDocument = HydratedDocument<Class>;

@Schema({ timestamps: true })
export class Class {
  @Prop({ required: true, unique: true, trim: true })
  classCode: string;

  @Prop({ required: true, trim: true })
  className: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);