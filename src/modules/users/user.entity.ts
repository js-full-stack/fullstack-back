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
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './roles.entity';
import { UsersAndProgramsEntity } from '../commonTables/users_programs.entity';
import { Exclude } from 'class-transformer';

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

  @JoinColumn()
  @ManyToOne(() => Role, (role) => role.role)
  role: Role;

  @OneToMany(
    () => UsersAndProgramsEntity,
    (usersAndPrograms) => usersAndPrograms.user,
  )
  usersAndPrograms: UsersAndProgramsEntity[];

  @BeforeInsert()
  async setPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
