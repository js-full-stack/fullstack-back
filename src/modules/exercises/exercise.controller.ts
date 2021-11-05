import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { AddExerciseDto } from './dto/addPExerciseDto';
import { Exercise } from './exercise.entity'



@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}


  @Post('/add')
  @UsePipes(ValidationPipe)
  async createUser(@Body() addExercise: AddExerciseDto,
  ): Promise<Exercise> {
    return await this.exerciseService.addNewExercise(addExercise)
  }
} 
