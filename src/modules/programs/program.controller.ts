import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { addAndUpdateProgramDto } from './dto/addAndUpdateProgramDto';

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

  @Put('/:id')
  async updateProgram(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedProgram: addAndUpdateProgramDto,
  ) {
    return await this.programService.updateProgram(id, updatedProgram);
  }

  @Delete('/:id')
  async removeProgramById(@Param('id', ParseIntPipe) id: number) {
    return await this.programService.deleteProgramById(id);
  }
} 
