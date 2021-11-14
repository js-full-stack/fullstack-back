import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Program } from '../programs/program.entity';
import { User } from '../users/user.entity';

@Entity('exercise')
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Program, (program) => program.exercises, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'exercises_for_programs' })
  programs: Program[];

  // @ManyToOne(() => User, (author) => author.id, {
  //   eager: true,
  // })
  // @JoinColumn({ name: 'author' })
  // author: User;
}
