import { IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class UpdateQuizDto extends BaseDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
