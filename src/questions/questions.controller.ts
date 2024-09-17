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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleEnum } from 'src/users/dto/user.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Questions')
@UseGuards(AuthGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  // create question for a specific quiz
  @ApiBody({ type: CreateQuestionDto })
  @ApiOperation({ summary: 'Create a question' })
  @ApiResponse({ status: 201, description: 'Question created' })
  @Roles(RoleEnum.ADMIN)
  @Post()
  async createQuestion(
    @Body() body: CreateQuestionDto,
    @CurrentUser() user: User,
  ) {
    return this.questionsService.createQuestion(body, user.id);
  }
  // get questions for a specific quiz
  @ApiOperation({ summary: 'Get questions of a quiz' })
  @ApiResponse({ status: 200, description: 'Questions found' })
  @Get('quiz/:id')
  async getQuestionsOfQuiz(@Param('id') id: string) {
    return this.questionsService.getQuestionsOfQuiz(id);
  }
  // get a single question
  @ApiOperation({ summary: 'Get a question' })
  @ApiResponse({ status: 200, description: 'Question found' })
  @Get(':id')
  async getQuestion(@Param('id') id: string) {
    return this.questionsService.getQuestion(id);
  }

  // update a question
  @ApiBody({ type: UpdateQuestionDto })
  @ApiOperation({ summary: 'Update a question' })
  @ApiResponse({ status: 200, description: 'Question updated' })
  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() body: UpdateQuestionDto,
    @CurrentUser() user: User,
  ) {
    return this.questionsService.updateQuestion(id, body, user.id);
  }
  // delete a question
  @ApiOperation({ summary: 'Delete a question' })
  @ApiResponse({ status: 200, description: 'Question deleted' })
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    return this.questionsService.deleteQuestion(id);
  }
}
