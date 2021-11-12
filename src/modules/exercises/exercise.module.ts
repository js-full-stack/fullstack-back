import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseController } from './exercise.controller';
import { ExerciseRepo } from './exercise.repository';
import { ExerciseService } from './exercise.service';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService],
  imports: [TypeOrmModule.forFeature([ExerciseRepo])],
})
export class ExerciseModule {}


