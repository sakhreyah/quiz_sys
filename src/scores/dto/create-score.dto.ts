import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class CreateScoreDto extends BaseDto {
  @ApiProperty({ description: 'the id of the quiz', example: 'string' })
  @IsString()
  quiz_id: string;
}
