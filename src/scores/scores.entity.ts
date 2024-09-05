import { User } from '../users/users.entity';
import { Base } from '../base/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Quiz } from '../quizzes/quizzes.entity';

@Entity()
export class Score extends Base {
  @ManyToOne(() => User, (user) => user.score)
  user: User;

  @OneToOne(() => Quiz, (quiz) => quiz.score)
  quiz: Quiz;

  @Column()
  score: number;
}
