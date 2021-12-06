import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from '../programs/program.entity';

import { ExerciseController } from './exercise.controller';
import { Exercise } from './exercise.entity';
import { ExerciseService } from './exercise.service';
import { ExercisesToProgram } from './exercisesToPrograms.entity';
@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService],
  imports: [TypeOrmModule.forFeature([Exercise, Program, ExercisesToProgram])],
})
export class ExerciseModule {}
