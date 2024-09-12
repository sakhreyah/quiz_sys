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
import { ResponsesService } from './responses.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CreateResponseDto } from './dto/create-response.dto';
import { User } from 'src/users/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateResponseDto } from './dto/update-response.dto';

@UseGuards(AuthGuard)
@Controller('responses')
export class ResponsesController {
  constructor(private responsesService: ResponsesService) {}

  // create response for an option
  @Post()
  createResponse(@Body() body: CreateResponseDto, @CurrentUser() user: User) {
    return this.responsesService.createResponse(body, user.id);
  }

  // get response
  @Get(':id')
  getResponse(@Param('id') id: string) {
    return this.responsesService.getResponse(id);
  }

  // get a response for an question
  @Get('question/:id')
  getResponseForUserInQuestion(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.responsesService.getResponseForUserInQuestion(id, user.id);
  }

  // get responses for quiz
  @Get('quiz/:id')
  getResponsesForUserInQuiz(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.responsesService.getResponsesForUserInQuiz(id, user.id);
  }

  // update response
  @Patch(':id')
  updateResponse(
    @Param('id') id: string,
    @Body() body: UpdateResponseDto,
    @CurrentUser() user: User,
  ) {
    return this.responsesService.updateResponse(id, body, user.id);
  }

  // delete response
  @Delete(':id')
  deleteResponse(@Param('id') id: string) {
    return this.responsesService.deleteResponse(id);
  }
}
