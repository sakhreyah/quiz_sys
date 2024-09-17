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
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/users.entity';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { RoleEnum } from 'src/users/dto/user.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Quizzes')
@UseGuards(AuthGuard)
@Controller('quizzes')
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({ status: 200, description: 'Quizzes found' })
  @Roles(RoleEnum.ADMIN)
  @Get()
  async getQuizzes() {
    return this.quizzesService.getQuizzes();
  }

  @ApiOperation({ summary: 'Get quiz by id' })
  @ApiResponse({ status: 200, description: 'Quiz found' })
  @Get(':id')
  async getQuiz(@Param('id') id: string) {
    return this.quizzesService.getQuiz(id);
  }

  @ApiBody({ type: CreateQuizDto })
  @ApiOperation({ summary: 'Create a quiz' })
  @ApiResponse({ status: 201, description: 'Quiz created' })
  @Roles(RoleEnum.ADMIN)
  @Post()
  async createQuiz(@Body() body: CreateQuizDto, @CurrentUser() user: User) {
    return this.quizzesService.createQuiz(body, user.id);
  }

  @ApiBody({ type: UpdateQuizDto })
  @ApiOperation({ summary: 'Update a quiz' })
  @ApiResponse({ status: 200, description: 'Quiz updated' })
  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  async updateQuiz(
    @Param('id') id: string,
    @Body() body: UpdateQuizDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.quizzesService.updateQuiz(id, body, currentUser.id);
  }

  @ApiOperation({ summary: 'Delete a quiz' })
  @ApiResponse({ status: 200, description: 'Quiz deleted' })
  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  async deleteQuiz(@Param('id') id: string) {
    return this.quizzesService.deleteQuiz(id);
  }
}
