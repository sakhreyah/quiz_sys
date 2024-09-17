import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class CreateResponseDto extends BaseDto {
  @ApiProperty({
    description: 'the id of the selected option',
    example: 'string',
  })
  @IsString()
  selected_option_id: string;
}
