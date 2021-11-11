import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './roles/roles.entity';
import { UsersProgramsEntity } from '../commonTables/usersPrograms.entity';
import { Exclude } from 'class-transformer';
import { Program } from '../programs/program.entity';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  // @Exclude()
  @Column()
  password: string;

  @CreateDateColumn({})
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @JoinColumn({ name: 'role' })
  @ManyToOne(() => Role, ({ role }) => role)
  role: Role;

  // @ManyToMany(() => Program)
  // programs: Program[];

  @OneToMany(
    () => UsersProgramsEntity,
    (usersProgram: UsersProgramsEntity) => usersProgram.user,
  )
  usersProgram: UsersProgramsEntity[];

  @BeforeInsert()
  async setPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
