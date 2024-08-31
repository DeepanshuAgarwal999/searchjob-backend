import { IsString } from 'class-validator';

export class CreateApplicationDto {
    
  @IsString()
  companyId: string;
  @IsString()
  userId: string;
}
