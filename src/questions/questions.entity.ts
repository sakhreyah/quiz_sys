import { Quiz } from '../quizzes/quizzes.entity';
import { Base } from '../base/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Option } from '../options/options.entity';

@Entity()
export class Question extends Base {
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @Column()
  question_text: string;

  @Column()
  question_type: string;

  @OneToMany(() => Option, (option) => option.question)
  option: Option[];
}
