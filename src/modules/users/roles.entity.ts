import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryColumn()
  role: string;
}
