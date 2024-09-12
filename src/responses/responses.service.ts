import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './responses.entity';
import { Repository } from 'typeorm';
import { OptionsService } from 'src/options/options.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { QuestionsService } from 'src/questions/questions.service';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,
    private optionsService: OptionsService,
    private questionsService: QuestionsService,
    private quizzesService: QuizzesService,
    private usersService: UsersService,
  ) {}

  async createResponse(
    response: CreateResponseDto,
    userId: string,
  ): Promise<Response> {
    const option = await this.optionsService.getOption(
      response.selected_option_id,
    );
    if (!option) {
      throw new NotFoundException('option not found');
    }

    const question = option.question;
    if (!question) {
      throw new NotFoundException('question not found');
    }

    const quiz = question.quiz;
    if (!quiz) {
      throw new NotFoundException('quiz not found');
    }

    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const existingResponse = await this.getResponseForUserInQuestion(
      question.id,
      user.id,
    );

    if (existingResponse) {
      throw new ConflictException(
        'A response already exists for this question by this user',
      );
    }

    const newResponse = this.responsesRepository.create(response);
    newResponse.user = user;
    newResponse.quiz = quiz;
    newResponse.question = question;
    newResponse.option = option;
    newResponse.created_by = userId;
    return this.responsesRepository.save(newResponse);
  }

  async getResponse(id: string): Promise<Response> {
    return this.responsesRepository.findOne({
      where: { id },
      relations: ['user', 'quiz', 'question', 'option'],
    });
  }

  async getResponseForUserInQuestion(
    id: string,
    userId: string,
  ): Promise<Response | null> {
    const question = await this.questionsService.getQuestion(id);
    if (!question) {
      throw new NotFoundException('question not found');
    }

    const user = await this.usersService.getUser(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const response = await this.responsesRepository.findOne({
      where: {
        question: { id },
        user: { id: userId },
      },
      relations: ['user', 'quiz', 'question', 'option'],
    });

    if (!response) {
      return null;
    }

    return response;
  }

  async getResponsesForUserInQuiz(
    id: string,
    userId: string,
  ): Promise<Response[]> {
    const quiz = await this.quizzesService.getQuiz(id);
    if (!quiz) {
      throw new NotFoundException('quiz not found');
    }
    return this.responsesRepository.find({
      where: { question: { quiz: { id } }, user: { id: userId } },
      relations: ['user', 'quiz', 'question', 'option'],
    });
  }

  async updateResponse(
    id: string,
    attrs: Partial<Response>,
    userId: string,
  ): Promise<Response> {
    const response = await this.getResponse(id);
    if (!response) {
      throw new NotFoundException('response not found');
    }
    Object.assign(response, attrs);
    response.updated_by = userId;
    return this.responsesRepository.save(response);
  }

  async deleteResponse(id: string): Promise<Response> {
    const response = await this.getResponse(id);
    if (!response) {
      throw new NotFoundException('response not found');
    }
    return this.responsesRepository.remove(response);
  }
}
