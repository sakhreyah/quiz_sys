import { IsBoolean, IsString } from 'class-validator';
import { BaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto extends BaseDto {
  @ApiProperty({ description: 'the id of the question', example: 'string' })
  @IsString()
  question_id: string;

  @ApiProperty({
    description: 'the text of the option',
    example: 'string',
  })
  @IsString()
  option_text: string;

  @ApiProperty({
    description: 'whether the option is correct or not',
    example: 'boolean',
  })
  @IsBoolean()
  is_correct: boolean;
}
