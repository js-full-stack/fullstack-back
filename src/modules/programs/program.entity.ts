import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Exercise } from '../exercises/exercise.entity';
import { ExerciseToProgram } from '../exercises/exercisesToPrograms.entity';

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

  @ManyToOne(() => User, (subscriber) => subscriber.id, {
    eager: true,
  })
  @JoinColumn({ name: 'subscriber' })
  subscriber: number;

  @OneToMany(
    () => ExerciseToProgram,
    (exerciseToProgram) => exerciseToProgram.exerciseId,
  )
  exerciseToProgram: ExerciseToProgram[];
}

 

