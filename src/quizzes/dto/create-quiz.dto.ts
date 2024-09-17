import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class CreateQuizDto extends BaseDto {
  @ApiProperty({ description: 'the title of the quiz', example: 'string' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'the description of the quiz',
    example: 'string',
  })
  @IsString()
  description: string;
}
