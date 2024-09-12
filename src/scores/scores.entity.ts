import { User } from '../users/users.entity';
import { Base } from '../base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Quiz } from '../quizzes/quizzes.entity';

@Entity('scores')
export class Score extends Base {
  @ManyToOne(() => User, (user) => user.score)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Quiz, (quiz) => quiz.score)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column()
  score: number;
}
