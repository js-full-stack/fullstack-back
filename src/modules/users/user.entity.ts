import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from './userRoles.entity'

@Entity('users')
@Unique(["email"])

export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    firstName: string;
  
    @Column()
    lastName: string;

    @Column() 
    email: string; 

    @Column() 
    phone: string;
  
    @Column()
    password: string;
  
    @CreateDateColumn({})
    createdAt: Date;
 
    @UpdateDateColumn()
    updatedAt: Date;
  
  
    @OneToOne( ()=> UserRoles)
    @JoinColumn()
    role: UserRoles;
  
    @BeforeInsert()
    async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}

