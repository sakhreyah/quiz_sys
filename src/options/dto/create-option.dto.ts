import { IsBoolean, IsString } from 'class-validator';
import { BaseDto } from '../../base/base.dto';

export class CreateOptionDto extends BaseDto {
  @IsString()
  question_id: string;

  @IsString()
  option_text: string;

  @IsBoolean()
  is_correct: boolean;
}
