import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { Roles } from './decorators/roles.decorator';
import { RoleEnum } from 'src/users/dto/user.enum';
import { SignUpDto } from './dto/signup.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signup(@Body() body: SignUpDto) {
    return this.authService.signup(body, 'system');
  }

  @Public()
  @Post('/signin')
  async signin(@Body() body: SignInDto) {
    return this.authService.signin(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('admin')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
