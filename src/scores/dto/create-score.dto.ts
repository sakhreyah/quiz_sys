import { IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class CreateScoreDto extends BaseDto {
  @IsString()
  quiz_id: string;
}
