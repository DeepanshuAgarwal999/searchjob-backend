import { IsArray, IsEnum, IsOptional, IsString, Length } from 'class-validator';

class RequirementsDto {
  @IsArray()
  @IsString({ each: true })
  education: string[];

  @IsArray()
  @IsString({ each: true })
  experience: string[];
}

export class CreateCompanyDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  pay: string;

  @IsEnum(['Remote', 'Full time', 'Part time'])
  type: 'Remote' | 'Full time' | 'Part time';

  @IsArray()
  @IsString({ each: true })
  benefits: string[];

  @IsString()
  @Length(50, 500)
  description: string;

  @IsString()
  postedOn: string;

  @IsArray()
  @IsString({ each: true })
  responsibilities: string[];

  requirements: RequirementsDto;
}
