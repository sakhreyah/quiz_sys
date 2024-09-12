import { Response } from '../responses/responses.entity';
import { Base } from '../base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Score } from '../scores/scores.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends Base {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  role: string = 'STUDENT';

  @OneToMany(() => Response, (response) => response.user)
  response: Response[];

  @OneToMany(() => Score, (score) => score.user)
  score: Score[];
}
