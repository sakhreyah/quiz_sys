import { IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class UpdateResponseDto extends BaseDto {
  @IsString()
  @IsOptional()
  selected_option_id: string;
}
