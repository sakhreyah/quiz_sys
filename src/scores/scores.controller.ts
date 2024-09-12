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
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateScoreDto } from './dto/update-score.dto';
import { RoleEnum } from 'src/users/dto/user.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard)
@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}

  @Roles(RoleEnum.ADMIN)
  @Post()
  async createScore(@Body() body: CreateScoreDto, @CurrentUser() user: User) {
    return this.scoresService.createScore(body, user.id);
  }

  @Get(':id')
  async getScore(@Param('id') id: string) {
    return this.scoresService.getScore(id);
  }

  // get scores for a user
  @Get('user/:id')
  async getScoresForUser(@Param('id') id: string) {
    return this.scoresService.getScoresForUser(id);
  }

  // get scores for a quiz
  @Get('quiz/:id')
  async getScoresForQuiz(@Param('id') id: string) {
    return this.scoresService.getScoresForQuiz(id);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  async updateScore(
    @Param('id') id: string,
    @Body() body: UpdateScoreDto,
    @CurrentUser() user: User,
  ) {
    return this.scoresService.updateScore(id, body, user.id);
  }

  @Delete(':id')
  async deleteScore(@Param('id') id: string) {
    return this.scoresService.deleteScore(id);
  }
}
