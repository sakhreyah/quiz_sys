import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signup(body, user_id: string) {
    const users = await this.usersService.find(body.email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const user = await this.usersService.create(body, user_id);

    return user;
  }

  async signin(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('invalid credentials');
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
