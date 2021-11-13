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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { Roles } from 'src/utils/roles.decorator';
import { userRoles } from 'src/utils/constants';

@Controller('program')
export class ProgramController {
  constructor(private programService: ProgramService) {}

  // ADD NEW PROGRAM
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @Roles(userRoles.Couch)
  @UsePipes(ValidationPipe)
  async createProgram(
    @Body() newProgram: createProgramDto,
    @Request() req: RequestWithUser,
  ) {
    return await this.programService.addNewProgram(newProgram, req.user);
  }

  // GET ALL PROGRAMS

  @Get('/')
  async getAllPrograms() {
    return await this.programService.getAllPrograms();
  }

  // GET PROGRAM BY ID
  @Get('/:id')
  async getProgramById(@Param('id', ParseIntPipe) id: number) {
    return await this.programService.getProgramById(id);
  }

  // UPDATE PROGRAM
  @Put('/:id')
  async updateProgram(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedProgram: createProgramDto,
  ) {
    return await this.programService.updateProgram(id, updatedProgram);
  }

  // DELETE PROGRAM
  @Delete('/:id')
  async removeProgramById(@Param('id', ParseIntPipe) id: number) {
    return await this.programService.deleteProgramById(id);
  }
} 
 