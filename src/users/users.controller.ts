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
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, description: 'User found' })
  @ApiOperation({ summary: 'Get user by id' })
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @ApiResponse({ status: 200, description: 'Users found' })
  @ApiOperation({ summary: 'Get all users or Get user by email' })
  @ApiQuery({ required: false, name: 'email' })
  @Roles(RoleEnum.ADMIN)
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @ApiResponse({ status: 201, description: 'User created' })
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @Roles(RoleEnum.ADMIN)
  @Post()
  createUser(@Body() body: CreateUserDto, @CurrentUser() user: User) {
    return this.usersService.create(body, user.id);
  }

  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiOperation({ summary: 'Delete user by id' })
  @Roles(RoleEnum.ADMIN)
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiOperation({ summary: 'Update user by id' })
  @ApiBody({ type: UpdateUserDto })
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
