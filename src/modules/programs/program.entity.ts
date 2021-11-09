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
} from 'typeorm';

import { ProgramsAndExercisesEntity } from '../commonTables/programs_exercises.entity';
import { UsersAndProgramsEntity } from '../commonTables/users_programs.entity';
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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => ProgramsAndExercisesEntity,
    (programsAndExercises) => programsAndExercises.program,
  )
  programsAndExercises: ProgramsAndExercisesEntity[];

  @OneToMany(
    () => UsersAndProgramsEntity,
    (usersAndPrograms) => usersAndPrograms.program,
  )
  usersAndPrograms: UsersAndProgramsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
