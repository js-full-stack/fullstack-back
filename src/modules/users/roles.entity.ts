import { IsIn } from 'class-validator';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn()
  role: string;
}
