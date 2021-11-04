import { BaseEntity, Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { User } from './user.entity'

 enum UserRole {
  COUCH = 'couch',
  ATHLETE = 'athlete'
}


@Entity('roles')
export class UserRoles  {
  @PrimaryGeneratedColumn()
  id: number;
    
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ATHLETE
  })
  role: UserRole; 
}
    