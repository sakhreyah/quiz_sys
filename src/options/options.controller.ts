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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Options')
@UseGuards(AuthGuard)
@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  // create an option for a question
  @ApiBody({ type: CreateOptionDto })
  @ApiOperation({ summary: 'Create an option' })
  @ApiResponse({ status: 201, description: 'Option created' })
  @Roles(RoleEnum.ADMIN)
  @Post()
  createOption(@Body() body: CreateOptionDto, @CurrentUser() user: User) {
    return this.optionsService.createOption(body, user.id);
  }

  // get all options for a question
  @ApiOperation({ summary: 'Get options of a question' })
  @ApiResponse({ status: 200, description: 'Options found' })
  @Get('question/:id')
  getOptionsForQuestion(@Param('id') id: string) {
    return this.optionsService.getOptionsOfQuestion(id);
  }
  // get an option
  @ApiOperation({ summary: 'Get an option' })
  @ApiResponse({ status: 200, description: 'Option found' })
  @Get(':id')
  getOption(@Param('id') id: string) {
    return this.optionsService.getOption(id);
  }
  // update an option
  @ApiBody({ type: UpdateOptionDto })
  @ApiOperation({ summary: 'Update an option' })
  @ApiResponse({ status: 200, description: 'Option updated' })
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
  @ApiOperation({ summary: 'Delete an option' })
  @ApiResponse({ status: 200, description: 'Option deleted' })
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  deleteOption(@Param('id') id: string) {
    return this.optionsService.deleteOption(id);
  }
}
