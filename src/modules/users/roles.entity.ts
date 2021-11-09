import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  // @OneToMany(() => User, (user) => user.role, { cascade: true })
  // user: User[];
}
