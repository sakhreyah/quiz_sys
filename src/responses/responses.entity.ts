import { User } from '../users/users.entity';
import { Base } from '../base/base.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Quiz } from '../quizzes/quizzes.entity';
import { Option } from '../options/options.entity';
import { Question } from 'src/questions/questions.entity';

@Entity('responses')
export class Response extends Base {
  @ManyToOne(() => User, (user) => user.response)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.response)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @OneToOne(() => Question, (question) => question.response)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @OneToOne(() => Option, (option) => option.response)
  @JoinColumn({ name: 'selected_option_id' })
  option: Option;
}
