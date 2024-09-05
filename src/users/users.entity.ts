import { Response } from '../responses/responses.entity';
import { Base } from '../base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Score } from '../scores/scores.entity';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Response, (response) => response.user)
  response: Response[];

  @OneToMany(() => Score, (score) => score.user)
  score: Score[];
}
