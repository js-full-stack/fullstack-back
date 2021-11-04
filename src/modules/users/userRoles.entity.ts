import { BaseEntity, Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { User } from './user.entity'



@Entity()
export class UserRoles  {
  @PrimaryGeneratedColumn()
  roleId: number;
    
  @Column({})
  role: string; 
}
    