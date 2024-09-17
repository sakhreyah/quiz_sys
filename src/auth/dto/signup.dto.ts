import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ description: 'the username', example: 'string' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'the email', example: 'string' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'the password', example: 'string' })
  @IsString()
  password: string;
}
