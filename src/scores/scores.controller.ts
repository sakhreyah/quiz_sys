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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Scores')
@UseGuards(AuthGuard)
@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}

  @ApiBody({ type: CreateScoreDto })
  @ApiOperation({ summary: 'submit quiz' })
  @ApiResponse({ status: 201, description: 'quiz submitted' })
  @Roles(RoleEnum.ADMIN)
  @Post()
  async createScore(@Body() body: CreateScoreDto, @CurrentUser() user: User) {
    return this.scoresService.createScore(body, user.id);
  }

  @ApiOperation({ summary: 'Get score by id' })
  @ApiResponse({ status: 200, description: 'Score found' })
  @Get(':id')
  async getScore(@Param('id') id: string) {
    return this.scoresService.getScore(id);
  }

  // get scores for a user
  @ApiOperation({ summary: 'Get scores for user' })
  @ApiResponse({ status: 200, description: 'Scores found' })
  @Get('user/:id')
  async getScoresForUser(@Param('id') id: string) {
    return this.scoresService.getScoresForUser(id);
  }

  // get scores for a quiz
  @ApiOperation({ summary: 'Get scores for quiz' })
  @ApiResponse({ status: 200, description: 'Scores found' })
  @Get('quiz/:id')
  async getScoresForQuiz(@Param('id') id: string) {
    return this.scoresService.getScoresForQuiz(id);
  }

  @ApiOperation({ summary: 'Update score' })
  @ApiResponse({ status: 200, description: 'Score updated' })
  @ApiBody({ type: UpdateScoreDto })
  @Roles(RoleEnum.ADMIN)
  @Patch(':id')
  async updateScore(
    @Param('id') id: string,
    @Body() body: UpdateScoreDto,
    @CurrentUser() user: User,
  ) {
    return this.scoresService.updateScore(id, body, user.id);
  }

  @ApiOperation({ summary: 'Delete score' })
  @ApiResponse({ status: 200, description: 'Score deleted' })
  @Delete(':id')
  async deleteScore(@Param('id') id: string) {
    return this.scoresService.deleteScore(id);
  }
}
