import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { AddProgramDto } from './dto/addProgramDto';
import { Program } from './program.entity'



@Controller('program')
  
export class ProgramController {
  constructor(private programService: ProgramService) {}


  @Post('/add')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() addProgram: AddProgramDto,
  ): Promise<Program> {
    return await this.programService.addNewProgram(addProgram)
  }
} 
