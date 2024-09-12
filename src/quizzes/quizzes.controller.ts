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

@UseGuards(AuthGuard)
@Controller('quizzes')
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Roles(RoleEnum.ADMIN)
  @Get()
  async getQuizzes() {
    return this.quizzesService.getQuizzes();
  }

  @Get(':id')
  async getQuiz(@Param('id') id: string) {
    return this.quizzesService.getQuiz(id);
  }

  @Roles(RoleEnum.ADMIN)
  @Post()
  async createQuiz(@Body() body: CreateQuizDto, @CurrentUser() user: User) {
    return this.quizzesService.createQuiz(body, user.id);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  async updateQuiz(
    @Param('id') id: string,
    @Body() body: UpdateQuizDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.quizzesService.updateQuiz(id, body, currentUser.id);
  }

  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  async deleteQuiz(@Param('id') id: string) {
    return this.quizzesService.deleteQuiz(id);
  }
}
