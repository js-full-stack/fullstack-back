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
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { createProgramDto } from './dto/createProgramDto';
import { JwtAuthGuard } from '../users/auth/guards/jwt-auth.guard';
import RequestWithUser from '../users/auth/requestWithUser.interface';
@Controller('program')
export class ProgramController {
  constructor(private programService: ProgramService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createProgram(
    @Body() newProgram: createProgramDto,
    @Request() req: RequestWithUser,
  ) {
    return await this.programService.addNewProgram(newProgram, req.user);
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
    @Body() updatedProgram: createProgramDto,
  ) {
    return await this.programService.updateProgram(id, updatedProgram);
  }

  @Delete('/:id')
  async removeProgramById(@Param('id', ParseIntPipe) id: number) {
    return await this.programService.deleteProgramById(id);
  }
} 
 