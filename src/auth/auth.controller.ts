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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: SignUpDto })
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 201, description: 'User created' })
  @Public()
  @Post('/signup')
  async signup(@Body() body: SignUpDto) {
    return this.authService.signup(body, 'system');
  }

  @ApiBody({ type: SignInDto })
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200, description: 'User signed in' })
  @Public()
  @Post('/signin')
  async signin(@Body() body: SignInDto) {
    return this.authService.signin(body.email, body.password);
  }

  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'User found' })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Get admin profile' })
  @ApiResponse({ status: 200, description: 'Admin found' })
  @UseGuards(AuthGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('admin')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
