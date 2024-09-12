import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './scores.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { ResponsesService } from 'src/responses/responses.service';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score) private scoresRepository: Repository<Score>,
    private usersService: UsersService,
    private quizzesService: QuizzesService,
    private responsesService: ResponsesService,
  ) {}

  async createScore(body: CreateScoreDto, userId: string): Promise<Score> {
    const quiz = await this.quizzesService.getQuiz(body.quiz_id);
    if (!quiz) {
      throw new NotFoundException('quiz not found');
    }

    const user = await this.usersService.getUser(userId);

    const questions = quiz.questions;

    const totalQuestionsCount = questions.length;

    const responses = await this.responsesService.getResponsesForUserInQuiz(
      body.quiz_id,
      userId,
    );

    let correctResponsesCount = 0;
    for (const response of responses) {
      if (response.option.is_correct) {
        correctResponsesCount++;
      }
    }

    const scoreValue = (correctResponsesCount / totalQuestionsCount) * 100;

    const score = this.scoresRepository.create(body);

    score.user = user;
    score.quiz = quiz;
    score.score = scoreValue;
    score.created_by = userId;
    return this.scoresRepository.save(score);
  }

  async getScore(id: string): Promise<Score> {
    return this.scoresRepository.findOne({
      where: { id },
      relations: ['user', 'quiz'],
    });
  }

  async getScoresForUser(id: string): Promise<Score[]> {
    const user = await this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.scoresRepository.find({
      where: { user: { id } },
      relations: ['user', 'quiz'],
    });
  }

  async getScoresForQuiz(id: string): Promise<Score[]> {
    const quiz = await this.quizzesService.getQuiz(id);
    if (!quiz) {
      throw new NotFoundException('quiz not found');
    }
    return this.scoresRepository.find({
      where: { quiz: { id } },
      relations: ['user', 'quiz'],
    });
  }

  async updateScore(
    id: string,
    attrs: Partial<Score>,
    userId: string,
  ): Promise<Score> {
    const score = await this.getScore(id);
    if (!score) {
      throw new NotFoundException('score not found');
    }
    Object.assign(score, attrs);
    score.updated_by = userId;
    return this.scoresRepository.save(score);
  }

  async deleteScore(id: string): Promise<Score> {
    const score = await this.getScore(id);
    if (!score) {
      throw new NotFoundException('score not found');
    }
    return this.scoresRepository.remove(score);
  }
}
