import { IsEmail, IsEnum, IsString } from 'class-validator';
import { BaseDto } from '../../base/base.dto';
import { RoleEnum } from './user.enum';

export class CreateUserDto extends BaseDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(RoleEnum)
  role: RoleEnum = RoleEnum.STUDENT;
}
