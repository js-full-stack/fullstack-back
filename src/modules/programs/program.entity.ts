import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { ProgramsAndExercisesEntity } from '../commonTables/programsExercises.entity';
import { UsersProgramsEntity } from '../commonTables/usersPrograms.entity';
import { User } from '../users/user.entity';

@Entity('program')
@Unique(['programName'])
export class Program extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  programName: string;

  @Column()
  programDesc: string;

  @Column()
  programDuration: number;

  @Column()
  programPrice: number;

  @OneToMany(
    () => ProgramsAndExercisesEntity,
    (programsAndExercises) => programsAndExercises.program,
  )
  programsAndExercises: ProgramsAndExercisesEntity[];

  @OneToMany(
    () => UsersProgramsEntity,
    (usersProgram: UsersProgramsEntity) => usersProgram.program,
  )
  UsersProgramsEntity: UsersProgramsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
