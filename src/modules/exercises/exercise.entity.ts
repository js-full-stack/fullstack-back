import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';

@Entity('exercise')
@Unique(["exerciseName"])

export class Exercise extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    exerciseProgramId: number;

    @Column()
    exerciseName: string;
  
    @Column()
    exerciseDesc: string;  
             
    @CreateDateColumn()
    createdAt: Date;
 
    @UpdateDateColumn()
    updatedAt: Date;
}


