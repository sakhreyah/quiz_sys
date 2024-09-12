import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './options.entity';
import { Repository } from 'typeorm';
import { QuestionsService } from 'src/questions/questions.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { QuestionTypeEnum } from 'src/questions/dto/question.enum';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option) private optionsRepository: Repository<Option>,
    private questionsService: QuestionsService,
  ) {}

  async createOption(option: CreateOptionDto, userId: string): Promise<Option> {
    const question = await this.questionsService.getQuestion(
      option.question_id,
    );
    if (!question) {
      throw new NotFoundException('question not found');
    }

    if (question.question_type === QuestionTypeEnum.TRUE_FALSE) {
      const existingOptionsCount = question.option.length;

      if (existingOptionsCount >= 2) {
        throw new ConflictException(
          'Cannot create more than 2 options for a TRUE_FALSE question',
        );
      }
    }

    if (option.is_correct) {
      const existingCorrectOption = question.option.find(
        (option) => option.is_correct,
      );

      if (existingCorrectOption) {
        throw new ConflictException(
          'correct option already exists for this question',
        );
      }
    }

    const newOption = this.optionsRepository.create(option);
    newOption.question = question;
    newOption.created_by = userId;
    console.log(newOption);

    return this.optionsRepository.save(newOption);
  }

  async getOptionsOfQuestion(id: string): Promise<Option[]> {
    const question = await this.questionsService.getQuestion(id);
    if (!question) {
      throw new NotFoundException('question not found');
    }

    return question.option;
  }

  async getOption(id: string): Promise<Option> {
    if (!id) {
      return null;
    }
    return this.optionsRepository.findOne({
      where: { id },
      relations: ['question', 'question.quiz'],
    });
  }

  async updateOption(
    id: string,
    attrs: Partial<Option>,
    userId: string,
  ): Promise<Option> {
    const option = await this.getOption(id);
    if (!option) {
      throw new NotFoundException('option not found');
    }
    Object.assign(option, attrs);
    option.updated_by = userId;
    return this.optionsRepository.save(option);
  }

  async deleteOption(id: string): Promise<Option> {
    const option = await this.getOption(id);
    if (!option) {
      throw new NotFoundException('option not found');
    }
    return this.optionsRepository.remove(option);
  }
}
