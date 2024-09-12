import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './quizzes.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz) private quizzesRepository: Repository<Quiz>,
  ) {}

  async getQuizzes(): Promise<Quiz[]> {
    return this.quizzesRepository.find();
  }

  async getQuiz(id: string): Promise<Quiz> {
    if (!id) {
      return null;
    }
    return this.quizzesRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  async createQuiz(body: CreateQuizDto, userId: string): Promise<Quiz> {
    const quiz = this.quizzesRepository.create(body);

    quiz.created_by = userId;

    return this.quizzesRepository.save(quiz);
  }

  async updateQuiz(id: string, attrs: Partial<Quiz>, userId: string) {
    const quiz = await this.getQuiz(id);
    if (!quiz) {
      throw new NotFoundException('quiz not found');
    }
    Object.assign(quiz, attrs);
    quiz.updated_by = userId;
    return this.quizzesRepository.save(quiz);
  }

  async deleteQuiz(id: string): Promise<Quiz> {
    const quiz = await this.getQuiz(id);
    if (!quiz) {
      throw new NotFoundException('quiz not found');
    }
    return this.quizzesRepository.remove(quiz);
  }
}
