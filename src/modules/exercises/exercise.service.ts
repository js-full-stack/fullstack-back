
  
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '../programs/program.entity';
import { ProgramService } from '../programs/program.service';
import { User } from '../users/user.entity';

import { addExerciseDto } from './dto/addExerciseDto';
import { UpdateExerciseDto } from './dto/updateExerciseDto';
import { Exercise } from './exercise.entity';
import { ExercisesToProgram } from './exercisesToPrograms.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(ExercisesToProgram)
    private exerciseToProgramRepository: Repository<ExercisesToProgram>,
  ) {}
  // private programRepository: Repository<Program>,
  // private programService: ProgramService,
  //* CREATE EXERCISE
  async createExercise(exercise: addExerciseDto, authorId: number) {
    const newExercise = this.exerciseRepository.create({
      ...exercise,
      authorId,
    });

    return await this.exerciseRepository.save(newExercise);
  }

  //* GET ALL EXERCISES
  async getAllExercises(authorId: number) {
    return await this.exerciseRepository.find({ authorId });
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

  // * ADD or DELETE EXERCISES IN PROGRAM

  async addAndDeleteProgramExercises(data: {
    programId: number;
    exerciseId: number;
  }) {
    const exercisesToProgram = await this.exerciseToProgramRepository.find({
      where: {
        programId: data.programId,
      },
    });

    const match = exercisesToProgram.find(
      ({ exerciseId }) => exerciseId === data.exerciseId,
    );
    if (!match) {
      return await this.exerciseToProgramRepository.save(
        this.exerciseToProgramRepository.create(data),
      );
    } else {
      return await this.exerciseToProgramRepository.delete(data);
    }
  }

  async getAllExercisesToProgram() {
    const exercisesToProgram = await this.exerciseToProgramRepository.find({});
    return exercisesToProgram;
  }
}
