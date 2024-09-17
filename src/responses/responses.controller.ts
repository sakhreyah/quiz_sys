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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Responses')
@UseGuards(AuthGuard)
@Controller('responses')
export class ResponsesController {
  constructor(private responsesService: ResponsesService) {}

  // create response for an option
  @ApiBody({ type: CreateResponseDto })
  @ApiOperation({ summary: 'Create a response' })
  @ApiResponse({ status: 201, description: 'Response created' })
  @Post()
  createResponse(@Body() body: CreateResponseDto, @CurrentUser() user: User) {
    return this.responsesService.createResponse(body, user.id);
  }

  // get response
  @ApiOperation({ summary: 'Get response by id' })
  @ApiResponse({ status: 200, description: 'Response found' })
  @Get(':id')
  getResponse(@Param('id') id: string) {
    return this.responsesService.getResponse(id);
  }

  // get a response for an question
  @ApiOperation({ summary: 'Get response for user in question' })
  @ApiResponse({ status: 200, description: 'Response found' })
  @Get('question/:id')
  getResponseForUserInQuestion(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.responsesService.getResponseForUserInQuestion(id, user.id);
  }

  // get responses for quiz
  @ApiOperation({ summary: 'Get responses for user in quiz' })
  @ApiResponse({ status: 200, description: 'Responses found' })
  @Get('quiz/:id')
  getResponsesForUserInQuiz(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.responsesService.getResponsesForUserInQuiz(id, user.id);
  }

  // update response
  @ApiBody({ type: UpdateResponseDto })
  @ApiOperation({ summary: 'Update response' })
  @ApiResponse({ status: 200, description: 'Response updated' })
  @Patch(':id')
  updateResponse(
    @Param('id') id: string,
    @Body() body: UpdateResponseDto,
    @CurrentUser() user: User,
  ) {
    return this.responsesService.updateResponse(id, body, user.id);
  }

  // delete response
  @ApiOperation({ summary: 'Delete response' })
  @ApiResponse({ status: 200, description: 'Response deleted' })
  @Delete(':id')
  deleteResponse(@Param('id') id: string) {
    return this.responsesService.deleteResponse(id);
  }
}
