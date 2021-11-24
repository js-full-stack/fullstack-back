import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './roles.entity';
import { Exclude, Transform } from 'class-transformer';
import { ProgramsForAthletes } from '../programs/programsForAthletes.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
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

  @ManyToOne(() => Role, (role) => role.id, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'role' })
  @Transform(({ value }) => value.role)
  role: Role;

  @OneToMany(
    () => ProgramsForAthletes,
    (programsForAthletes) => programsForAthletes.programId,
  )
  programsToAthletes: ProgramsForAthletes[];

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
