import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
  @PrimaryColumn()
  role: string;
}
