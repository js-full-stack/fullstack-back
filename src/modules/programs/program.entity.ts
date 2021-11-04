import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';

@Entity('program')
@Unique(["programName"])

export class Program extends BaseEntity {
    @PrimaryGeneratedColumn()
    programId: number;
    
    @Column()
    programName: string;
  
    @Column()
    programDesc: string;
    
    @Column()
    programDuration: number; 
  
    @Column() 
    programPrice: number;

    @CreateDateColumn()
    createdAt: Date;
 
    @UpdateDateColumn()
    updatedAt: Date;
}


