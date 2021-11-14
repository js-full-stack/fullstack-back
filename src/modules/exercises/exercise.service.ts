
  
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '../programs/program.entity';
import { ProgramService } from '../programs/program.service';
import { User } from '../users/user.entity';

import { addExerciseDto } from './dto/addExerciseDto';
import { UpdateExerciseDto } from './dto/updateExerciseDto';
import { Exercise } from './exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    private programService: ProgramService,
  ) {}

  // CREATE EXERCISE
  async createExercise(exercise: addExerciseDto) {
    const newExercise = this.exerciseRepository.create(exercise);
    // const program = await this.programService.getProgramById();
    return await this.exerciseRepository.save({ ...newExercise });

    // const newExercise = this.exerciseRepository.create(exercise);
    // return await this.exerciseRepository.save(newExercise);
  }

  // GET ALL EXERCISES
  async getAllExercises() {
    return await this.exerciseRepository.find();
  }

  // GET EXERCISE BY ID
  async getExerciseById(id: number) {
    return await this.exerciseRepository.findOne(id);
  }

  // UPDATE EXERCISE
  async updateExerciseById(id: number, exercise: UpdateExerciseDto) {
    await this.exerciseRepository.update(id, exercise);
    return await this.getExerciseById(id);
  }

  // DELETE EXERCISE
  async deleteExerciseById(id: number) {
    return await this.exerciseRepository.delete(id);
  }
}

