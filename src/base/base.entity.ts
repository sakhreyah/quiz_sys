import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  created_by: string = 'test';

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  updated_by: string = 'test';
}
