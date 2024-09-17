import { BaseDto } from 'src/base/base.dto';
import { QuestionTypeEnum } from './question.enum';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto extends BaseDto {
  @ApiProperty({ description: 'the id of the quiz', example: 'string' })
  @IsString()
  quiz_id: string;

  @ApiProperty({
    description: 'the text of the question',
    example: 'string',
  })
  @IsString()
  question_text: string;

  @ApiProperty({
    description: 'the type of the question',
    enum: QuestionTypeEnum,
    example: Object.values(QuestionTypeEnum),
  })
  @IsEnum(QuestionTypeEnum)
  question_type: QuestionTypeEnum;
}
