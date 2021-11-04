
  
import { Injectable } from '@nestjs/common';
import { AddProgramDto } from './dto/addProgramDto';
import { Program } from './program.entity';

@Injectable()
export class ProgramService {
  async addNewProgram(
    addProgram: AddProgramDto,
  ): Promise<Program> {

    const program = new Program();

    program.programName = addProgram.programName;
    program.programPrice = addProgram.programPrice;
    program.programDesc = addProgram.programDesc;
    program.programDuration = addProgram.programDuration;

    return await program.save();
  }
}