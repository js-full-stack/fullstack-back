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
             
    @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'created_at'
    })
    createdAt: Date;
 
    @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'updated'
    })
    updatedAt: Date;
}


