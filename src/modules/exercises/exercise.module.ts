import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from '../programs/program.entity';
import { ProgramModule } from '../programs/program.module';
import { ProgramService } from '../programs/program.service';
// import { ProgramModule } from '../programs/program.module';
// import { ProgramService } from '../programs/program.service';
import { ExerciseController } from './exercise.controller';
import { Exercise } from './exercise.entity';
import { ExerciseService } from './exercise.service';
import { ExercisesToProgram } from './exercisesToPrograms.entity';
@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService],
  imports: [
    TypeOrmModule.forFeature([Exercise, Program, ExercisesToProgram]),
    // ProgramModule,
  ],
})
export class ExerciseModule {}    
  