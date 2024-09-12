import { IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class CreateResponseDto extends BaseDto {
  @IsString()
  selected_option_id: string;
}
