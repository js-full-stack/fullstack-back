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
  Put,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { addExerciseDto } from './dto/addExerciseDto';
import { UpdateExerciseDto } from './dto/updateExerciseDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-auth.guard';
import { Roles } from 'src/utils/roles.decorator';
import { userRoles } from 'src/utils/constants';
import RequestWithUser from '../auth/authUser.interface';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  // CREATE EXERCISE
  @Post('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRoles.Couch)
  @UsePipes(ValidationPipe)
  async createExercise(
    @Body() exercise: addExerciseDto,
    @Request() req: RequestWithUser,
  ) {
    try {
      return await this.exerciseService.createExercise(exercise, req.user.id);
    } catch (error) {
      return error.message;
    }
  }

  // GET ALL EXERCISES
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllExercises(@Request() req: RequestWithUser) {
    return await this.exerciseService.getAllExercises(req.user.id);
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(userRoles.Couch)
  @Post('/to-program')
  addExerciseToProgram(@Body() { programId, exercisesId }) {
    const response = exercisesId.map(async (exerciseId: number) => {
      const result = await this.exerciseService.addAndDeleteProgramExercises({
        programId,
        exerciseId,
      });
      return result;
    });

    return Promise.all(response);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/to-program')
  // async getExercisesToProgram() {
  //   const result = await this.exerciseService.getAllExercisesToProgram();
  //   console.log(result);
  //   return result;
  // }
}
 
  
    