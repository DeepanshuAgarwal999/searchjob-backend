import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum JobType {
  Remote = 'Remote',
  FullTime = 'Full time',
  PartTime = 'Part time',
}

@Schema({
  timestamps: true,
})
export class Company extends Document {
  @Prop({
    trim: true,
  })
  @IsOptional()
  @IsString()
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  @IsString()
  title: string;

  @Prop({
    required: true,
    trim: true,
  })
  @IsString()
  pay: string;
  

  @Prop({
    required: true,
    min: 50,
  })
  description: string;

  @Prop({
    required: true,
  })
  location: string;

  @Prop({
    required: true,
    enum: JobType,
  })
  @IsEnum(JobType)
  type: JobType;

  @Prop({
    type: [String],
    default: [],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  benefits: string[];

  @Prop({
    type: [String],
    default: [],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  responsibilities: string[];

  @Prop({
    type: {
      education: [String],
      experience: [String],
    },
    default: {
      education: [],
      experience: [],
    },
  })
  @ValidateNested()
  @Type(() => Object)
  requirements: {
    education: string[];
    experience: string[];
  };

  @Prop({
    required: true,
    type: Date,
  })
  @IsDateString()
  postedOn: Date;
}

export type CompanyDocument = Company & Document;
export const CompanySchema = SchemaFactory.createForClass(Company);
