import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramController } from '../programs/program.controller';
import { ProgramRepo } from '../programs/program.repository';
import { ProgramService } from '../programs/program.service';

import { ExerciseController } from './exercise.controller';
import { ExerciseRepo } from './exercise.repository';
import { ExerciseService } from './exercise.service';

@Module({
  controllers: [ExerciseController, ProgramController],
  providers: [ExerciseService, ProgramService],
  imports: [TypeOrmModule.forFeature([ExerciseRepo, ProgramRepo])],
})
export class ExerciseModule {}


