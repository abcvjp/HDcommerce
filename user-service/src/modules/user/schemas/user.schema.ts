import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export enum UserRole {
  USER = 1,
  ADMIN = 2,
  SYS_ADMIN = 3,
}

export enum Gender {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

@Schema({
  versionKey: false,
  timestamps: true,
})
export class User extends Document implements IUser {
  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true,
    enum: Object.values(UserRole).filter((value) => !isNaN(Number(value))),
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({
    type: Boolean,
    required: true,
    default: true,
  })
  isEnabled: true;

  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @Prop({
    type: Number,
    enum: Object.values(Gender).filter((value) => !isNaN(Number(value))),
    required: true,
  })
  gender: Gender;

  @Prop({
    type: Date,
    required: true,
    trim: true,
  })
  birthDay: Date;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phoneNumber: string;

  @Prop({
    type: [String],
    required: true,
    default: [],
  })
  addresses: string[];

  @Prop({
    type: String,
    required: false,
    default: null,
  })
  avatar: string;

  @Exclude()
  @Prop({
    type: String,
    required: true,
  })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
