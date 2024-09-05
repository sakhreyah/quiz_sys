import { User } from '../users/users.entity';
import { Base } from '../base/base.entity';
import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { Quiz } from '../quizzes/quizzes.entity';
import { Option } from '../options/options.entity';

@Entity()
export class Response extends Base {
  @ManyToOne(() => User, (user) => user.response)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.response)
  quiz: Quiz;

  @OneToOne(() => Option, (option) => option.response)
  option: Option;
}
