import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { UserRole } from '../../common/enum/user.enum.js';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, unique: true, trim: true })
  userName: string;

  @Prop({ required: true, select: false })
  passwordHash: string;

  @Prop({ required: true, enum: UserRole, type: String })
  role: UserRole;

  @Prop({
    required: function (this: User) {
      return this.role === UserRole.STUDENT;
    },
    sparse: true,
    trim: true,
  })
  studentCode?: string;

  @Prop({
    required: function (this: User) {
      return this.role === UserRole.STUDENT;
    },
    type: Types.ObjectId,
    ref: 'Class',
  })
  classId?: Types.ObjectId;

  @Prop({ select: false, trim: true })
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);