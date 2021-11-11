import { Entity, ManyToOne } from 'typeorm';

import { User } from '../users/user.entity';
import { Program } from '../programs/program.entity';

@Entity()
export class UsersProgramsEntity {
  @ManyToOne(() => User, (user: User) => user.id, { primary: true })
  user: User;

  @ManyToOne(() => Program, (program: Program) => program.id, { primary: true })
  program: Program;
}
