import { IsDate, IsString } from 'class-validator';

export class BaseDto {
  @IsString()
  id: string;

  @IsDate()
  created_at: Date;

  @IsString()
  created_by: string;

  @IsDate()
  updated_at: Date;

  @IsString()
  updated_by: string;
}
