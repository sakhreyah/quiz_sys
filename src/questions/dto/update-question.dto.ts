import { BaseDto } from 'src/base/base.dto';
import { QuestionTypeEnum } from './question.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto extends BaseDto {
  @IsString()
  @IsOptional()
  question_text: string;

  @IsOptional()
  @IsEnum(QuestionTypeEnum)
  question_type: QuestionTypeEnum;
}
