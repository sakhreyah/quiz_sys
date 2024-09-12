import { IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class CreateQuizDto extends BaseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
