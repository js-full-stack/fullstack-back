import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Program } from '../programs/program.entity';
import { ExerciseToProgram } from './exercisesToPrograms.entity';

@Entity('exercise')
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => ExerciseToProgram,
    (exerciseToProgram) => exerciseToProgram.programId,
  )
  exerciseToProgram: ExerciseToProgram[];
}

