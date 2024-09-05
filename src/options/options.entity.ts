import { Question } from '../questions/questions.entity';
import { Base } from '../base/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Response } from '../responses/responses.entity';

@Entity()
export class Option extends Base {
  @ManyToOne(() => Question, (question) => question.option)
  question: Question;

  @Column()
  option_text: string;

  @Column()
  is_correct: boolean;

  @OneToOne(() => Response, (response) => response.option)
  response: Response;
}
