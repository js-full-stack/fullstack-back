import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Program } from '../programs/program.entity';
import { Exercise } from './exercise.entity';

@Entity()
export class ExercisesToProgram {
  @PrimaryColumn()
  @ManyToOne(() => Exercise, (exercise) => exercise.id)
  @JoinColumn({ name: 'exerciseId', referencedColumnName: 'id' })
  exerciseId: number;

  @PrimaryColumn()
  @ManyToOne(() => Program, (program) => program.id)
  @JoinColumn({ name: 'programId', referencedColumnName: 'id' })
  programId: number;
}
  