import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    trim: true,
  })
  @IsOptional()
  @IsString()
  name: string;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  })
  @IsEmail()
  email: string;

  
  @Prop({
    default: null,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string;

  @Prop({
    default: null,
  })
  @IsOptional()
  @IsString()
  image: string;

  @Prop({
    default: null,
  })
  @IsOptional()
  @IsString()
  provider: string;

  @IsOptional()
  @IsString()
  oauth_id: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

// Middleware to hash password before saving
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
