import { BaseDto } from 'src/base/base.dto';
import { QuestionTypeEnum } from './question.enum';
import { IsEnum, IsString } from 'class-validator';

export class CreateQuestionDto extends BaseDto {
  @IsString()
  quiz_id: string;

  @IsString()
  question_text: string;

  @IsEnum(QuestionTypeEnum)
  question_type: QuestionTypeEnum;
}
