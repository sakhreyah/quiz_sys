import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class UpdateOptionDto extends BaseDto {
  @IsString()
  @IsOptional()
  question_id: string;

  @IsString()
  @IsOptional()
  option_text: string;

  @IsBoolean()
  @IsOptional()
  is_correct: boolean;
}
