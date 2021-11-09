import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  role: string;
}
