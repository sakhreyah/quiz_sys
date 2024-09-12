import { Question } from '../questions/questions.entity';
import { Base } from '../base/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Response } from '../responses/responses.entity';
import { Score } from '../scores/scores.entity';

@Entity('quizzes')
export class Quiz extends Base {
  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @OneToMany(() => Response, (response) => response.quiz)
  response: Response[];

  @OneToOne(() => Score, (score) => score.quiz)
  score: Score;
}
