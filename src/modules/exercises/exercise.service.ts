
  
import { Injectable } from '@nestjs/common';
import { AddExerciseDto } from './dto/addPExerciseDto';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExerciseService {
  async addNewExercise(
    addExercise: AddExerciseDto,
  ): Promise<Exercise> {

    const exercise = new Exercise();

    exercise.exerciseName = addExercise.exerciseName;
    exercise.exerciseDesc = addExercise.exerciseDesc;

    return await exercise.save();
  }
}