import { IsDate, IsOptional, IsString } from 'class-validator';

export class BaseDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsString()
  @IsOptional()
  created_by: string;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  @IsString()
  @IsOptional()
  updated_by: string;
}
