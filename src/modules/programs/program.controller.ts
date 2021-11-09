import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { addAndUpdateProgramDto } from './dto/addAndUpdateProgramDto';
import { Program } from './program.entity';

@Controller('program')
export class ProgramController {
  constructor(private programService: ProgramService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  async createProgram(@Body() addProgram: addAndUpdateProgramDto) {
    return await this.programService.addNewProgram(addProgram);
  }

  @Get('/')
  async getAllPrograms() {
    return await this.programService.getAllPrograms();
  }

  @Get('/:id')
  async getProgramById(@Param('id', ParseIntPipe) id: number) {
    return await this.programService.getProgramById(id);
  }

  @Patch('/:id')
  async updateExerciseById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedProgram: addAndUpdateProgramDto,
  ) {
    return await this.programService.updateProgramById(id, updatedProgram);
  }

  @Delete('/:id')
  async removeProgramById(@Param('id', ParseIntPipe) id: number) {
    return await this.programService.deleteProgramById(id);
  }
} 
