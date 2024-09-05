import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '../../base/base.dto';
import { RoleEnum } from './user.enum';

export class UpdateUserDto extends BaseDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsEnum(RoleEnum)
  @IsOptional()
  role: RoleEnum;
}
