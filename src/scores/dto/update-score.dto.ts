import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class UpdateScoreDto extends BaseDto {
  @IsString()
  @IsOptional()
  user_id: string;

  @IsString()
  @IsOptional()
  quiz_id: string;

  @IsNumber()
  @IsOptional()
  score: number;
}
