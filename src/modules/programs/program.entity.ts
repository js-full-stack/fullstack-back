import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Exercise } from '../exercises/exercise.entity';

import { User } from '../users/user.entity';

@Entity('program')
export class Program extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (author) => author.id, {
    eager: true,
  })
  @JoinColumn({ name: 'author' })
  author: User;

  @ManyToMany(() => Exercise, (exercise) => exercise.programs)
  exercises: Exercise[];
}

 

