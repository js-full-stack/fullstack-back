import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Program } from './program.entity';

@Entity()
export class ProgramsForAthletes {
  // @PrimaryGeneratedColumn()
  // exerciseToProgramId: number;

  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userId: number;

  @PrimaryColumn()
  @ManyToOne(() => Program, (program) => program.id)
  @JoinColumn({ name: 'programId', referencedColumnName: 'id' })
  programId: number;
}
