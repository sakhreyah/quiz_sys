import { IsEmail, IsEnum, IsString } from 'class-validator';
import { BaseDto } from '../../base/base.dto';
import { RoleEnum } from './user.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends BaseDto {
  @ApiProperty({ description: 'username', example: 'string' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'email', example: 'string' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'password', example: 'string' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'role',
    example: Object.values(RoleEnum),
    enum: RoleEnum,
  })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
