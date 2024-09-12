import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleEnum } from './dto/user.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Roles(RoleEnum.ADMIN)
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Roles(RoleEnum.ADMIN)
  @Post()
  createUser(@Body() body: CreateUserDto, @CurrentUser() user: User) {
    return this.usersService.create(body, user.id);
  }

  @Roles(RoleEnum.ADMIN)
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.usersService.update(id, body, currentUser);
  }
}
