import { Entity, ManyToOne } from 'typeorm';
import { Exercise } from '../exercises/exercise.entity';
import { Program } from '../programs/program.entity';

@Entity()
export class ProgramsAndExercisesEntity {
  @ManyToOne(() => Exercise, (exercise) => exercise, { primary: true })
  exercise: Exercise;

  @ManyToOne(() => Program, (program) => program.id, { primary: true })
  program: Program;
}
