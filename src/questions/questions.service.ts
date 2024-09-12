import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './questions.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuizzesService } from 'src/quizzes/quizzes.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private quizzesService: QuizzesService,
  ) {}

  async createQuestion(
    question: CreateQuestionDto,
    userId: string,
  ): Promise<Question> {
    const quiz = await this.quizzesService.getQuiz(question.quiz_id);

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const newQuestion = this.questionsRepository.create(question);
    newQuestion.quiz = quiz;
    newQuestion.created_by = userId;
    return this.questionsRepository.save(newQuestion);
  }

  async getQuestionsOfQuiz(id: string): Promise<Question[]> {
    const quiz = await this.quizzesService.getQuiz(id);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz.questions;
  }

  async getQuestion(id: string): Promise<Question | null> {
    if (!id) {
      return null;
    }
    return this.questionsRepository.findOne({
      where: { id },
      relations: ['option'],
    });
  }

  async updateQuestion(
    id: string,
    attrs: Partial<Question>,
    userId: string,
  ): Promise<Question> {
    const question = await this.getQuestion(id);
    if (!question) {
      throw new NotFoundException('question not found');
    }
    Object.assign(question, attrs);
    question.updated_by = userId;
    return this.questionsRepository.save(question);
  }

  async deleteQuestion(id: string): Promise<Question> {
    const question = await this.getQuestion(id);
    if (!question) {
      throw new NotFoundException('question not found');
    }
    return this.questionsRepository.remove(question);
  }
}
