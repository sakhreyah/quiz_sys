import { Quiz } from '../quizzes/quizzes.entity';
import { Base } from '../base/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Option } from '../options/options.entity';
import { Response } from 'src/responses/responses.entity';

@Entity('questions')
export class Question extends Base {
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column()
  question_text: string;

  @Column()
  question_type: string;

  @OneToMany(() => Option, (option) => option.question)
  option: Option[];

  @OneToOne(() => Response, (response) => response.question)
  response: Response;
}
