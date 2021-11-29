import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
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
import { ExercisesToProgram } from '../exercises/exercisesToPrograms.entity';

import { User } from '../users/user.entity';
import { ProgramsForAthletes } from './programsForAthletes.entity';

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

  // SUBSCRIBE
  @OneToMany(
    () => ProgramsForAthletes,
    (programsForAthletes) => programsForAthletes,
  )
  programsToAthletes: ProgramsForAthletes[];

  // EXERCISES TO PROGRAM
  @OneToMany(() => ExercisesToProgram, (exerciseToProgram) => exerciseToProgram)
  exerciseToProgram: ExercisesToProgram[];

  @ManyToOne(() => User, (author) => author.id, {
    eager: true,
  })
  @JoinColumn({ name: 'author' })
  author: User;
}
