import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProgramsAndExercisesEntity } from '../commonTables/programs_exercises.entity';

@Entity('exercise')
@Unique(['exerciseName'])
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exerciseName: string;

  @Column()
  exerciseDesc: string;

  @OneToMany(
    () => ProgramsAndExercisesEntity,
    (programsAndExercises) => programsAndExercises.exercise,
  )
  programsAndExercises: ProgramsAndExercisesEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated',
  })
  updatedAt: Date;
}
