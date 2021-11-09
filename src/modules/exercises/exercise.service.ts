
  
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AddAndUpdateExerciseDto } from './dto/addExerciseDto';
import { Exercise } from './exercise.entity';
import { ExerciseRepo } from './exercise.repository';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseRepo)
    private exerciseRepo: ExerciseRepo,
  ) {}

  async addNewExercise(exercise: AddAndUpdateExerciseDto) {
    return await this.exerciseRepo.save(exercise);
  }

  //* Get all exercises
  async getAllExercises(): Promise<Exercise[]> {
    return null;
  }

  //* Get exercise by id
  async getExerciseById(id: number): Promise<Exercise> {
    return await this.exerciseRepo.findOne(id, {
      relations: [],
    });
  }

  //* Update program
  async updateExerciseById(
    id: number,
    updateExercise: AddAndUpdateExerciseDto,
  ): Promise<Exercise> {
    return null;
  }

  //* deleteProgram
  async deleteExerciseById(id: number): Promise<Exercise> {
    return null;
  }
}


// import {getConnection} from "typeorm";
// await getConnection()
//     .createQueryBuilder()
//     .update(User)
//     .set({ firstName: "Timber", lastName: "Saw" })
//     .where("id = :id", { id: 1 })
//     .execute();
