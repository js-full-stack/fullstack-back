
  
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '../programs/program.entity';
import { ProgramService } from '../programs/program.service';

import { addExerciseDto } from './dto/addExerciseDto';
import { addExerciseToProgramDto } from './dto/addExerciseToProgramDto';
// import IExerciseToProgram from './exerciseToProgram.interface';
import { UpdateExerciseDto } from './dto/updateExerciseDto';
import { Exercise } from './exercise.entity';
import { ExerciseToProgram } from './exercisesToPrograms.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(ExerciseToProgram)
    private exerciseToProgramRepository: Repository<ExerciseToProgram>,
  ) {}
  // private programRepository: Repository<Program>,
  // private programService: ProgramService,
  //* CREATE EXERCISE
  async createExercise(exercise: addExerciseDto) {
    const newExercise = this.exerciseRepository.create(exercise);

    return await this.exerciseRepository.save(newExercise);
  }

  //* GET ALL EXERCISES
  async getAllExercises() {
    return await this.exerciseRepository.find();
  }

  //* GET EXERCISE BY ID
  async getExerciseById(id: number) {
    return await this.exerciseRepository.findOne(id);
  }

  //* UPDATE EXERCISE
  async updateExerciseById(id: number, exercise: UpdateExerciseDto) {
    await this.exerciseRepository.update(id, exercise);
    return await this.getExerciseById(id);
  }

  //* DELETE EXERCISE
  async deleteExerciseById(id: number) {
    return await this.exerciseRepository.delete(id);
  }

  // ! ADD EXERCISE TO PROGRAM
  async addExerciseToProgram(data: { programId: number; exerciseId: number }) {
    const newExerciseToProgram = this.exerciseToProgramRepository.create(data);
    return await this.exerciseToProgramRepository.save(newExerciseToProgram);
  }

  // ! DELETE EXERCISE FROM FROGRAM
  async deleteExerciseFromProgram(data: {
    programId: number;
    exerciseId: number;
  }) {
    return await this.exerciseToProgramRepository.delete(data);
  }
}

