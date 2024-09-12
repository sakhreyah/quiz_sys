import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/users.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { RoleEnum } from 'src/users/dto/user.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard)
@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  // create an option for a question
  @Roles(RoleEnum.ADMIN)
  @Post()
  createOption(@Body() body: CreateOptionDto, @CurrentUser() user: User) {
    return this.optionsService.createOption(body, user.id);
  }

  // get all options for a question
  @Get('question/:id')
  getOptionsForQuestion(@Param('id') id: string) {
    return this.optionsService.getOptionsOfQuestion(id);
  }
  // get an option
  @Get(':id')
  getOption(@Param('id') id: string) {
    return this.optionsService.getOption(id);
  }
  // update an option
  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  updateOption(
    @Param('id') id: string,
    @Body() body: UpdateOptionDto,
    @CurrentUser() user: User,
  ) {
    return this.optionsService.updateOption(id, body, user.id);
  }
  // delete an option
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  deleteOption(@Param('id') id: string) {
    return this.optionsService.deleteOption(id);
  }
}
