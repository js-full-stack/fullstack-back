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
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { addExerciseDto } from './dto/addExerciseDto';
import { Exercise } from './exercise.entity';
import { UpdateExerciseDto } from './dto/updateExerciseDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-auth.guard';
import { Roles } from 'src/utils/roles.decorator';
import { userRoles } from 'src/utils/constants';
import { Program } from '../programs/program.entity';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  // CREATE EXERCISE
  @Post('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRoles.Couch)
  @UsePipes(ValidationPipe)
  async createExercise(@Body() exercise: addExerciseDto) {
    return await this.exerciseService.createExercise(exercise);
  }

  // GET ALL EXERCISES
  @Get('/')
  async getAllExercises() {
    return await this.exerciseService.getAllExercises();
  }

  // GET EXERCISE BY ID
  @Get('/:id')
  async getExerciseById(@Param('id', ParseIntPipe) id: number) {
    return await this.exerciseService.getExerciseById(id);
  }

  // UPDATE EXERCISE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRoles.Couch)
  @Put('/:id')
  async updateExerciseById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedExercise: UpdateExerciseDto,
  ) {
    return await this.exerciseService.updateExerciseById(id, updatedExercise);
  }

  // DELETE EXERCISE
  @Delete('/:id')
  async removeExerciseById(@Param('id', ParseIntPipe) id: number) {
    return await this.exerciseService.deleteExerciseById(id);
  }

  // Add EXERCISE TO PROGRAM
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRoles.Couch)
  @Post('/to-program')
  async addExerciseToProgram(@Body() { programId, exercisesId }) {
    console.log('programId:', programId);
    console.log('exercisesId:', exercisesId);
    exercisesId.forEach(async (exerciseId: number) => {
      await this.exerciseService.addExerciseToProgram({
        programId,
        exerciseId,
      });
    });
  }
}

  

