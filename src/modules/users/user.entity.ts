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
import { Role } from './roles.entity';
// import { UsersProgramsEntity } from '../commonTables/usersPrograms.entity';
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

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({})
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Program, (program) => program.author)
  programs: Program[];

  @ManyToOne(() => Role, (role) => role.id, { eager: true })
  @JoinColumn({ name: 'role' })
  role: Role;

  // @ManyToMany(() => Program, (program: Program) => program.author)
  // programs: Program[];
  @BeforeInsert()
  async setPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
