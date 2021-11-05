import { Entity, ManyToOne } from 'typeorm';

import { User } from '../users/user.entity';
import { Program } from '../programs/program.entity';

@Entity()
export class UsersAndProgramsEntity {
  @ManyToOne(() => User, (user) => user.id, { primary: true })
  user: User;

  @ManyToOne(() => Program, (program) => program.id, { primary: true })
  program: Program;
}
