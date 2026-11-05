import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, unique: true, trim: true })
  courseCode: string;

  @Prop({ required: true, trim: true })
  courseName: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
