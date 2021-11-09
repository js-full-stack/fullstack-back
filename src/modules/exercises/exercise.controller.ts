import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { AddAndUpdateExerciseDto } from './dto/addExerciseDto';
import { Exercise } from './exercise.entity';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService,) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  async createExercise(
    @Body() exercise: AddAndUpdateExerciseDto,
  ): Promise<Exercise> {
    return await this.exerciseService.addNewExercise(exercise);
  }

  @Get('/')
  async getAllExercises(): Promise<Exercise[]> {
    return await this.exerciseService.getAllExercises();
  }

  @Get('/:id')
  async getExerciseById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Exercise> {
    return await this.exerciseService.getExerciseById(id);
  }

  @Patch('/:id')
  async updateExerciseById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedExercise: AddAndUpdateExerciseDto,
  ): Promise<Exercise> {
    return await this.exerciseService.updateExerciseById(id, updatedExercise);
  }

  @Delete('/:id')
  async removeExerciseById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Exercise> {
    return await this.exerciseService.deleteExerciseById(id);
  }
} 
