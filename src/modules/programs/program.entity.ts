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
  JoinTable,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @JoinColumn({ name: 'author' })
  @ManyToOne(() => User, (author) => author.programs)
  author: User;
}



