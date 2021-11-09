
  
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addAndUpdateProgramDto } from './dto/addAndUpdateProgramDto';
import { ProgramRepo } from './program.repository';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramRepo) private programRepo: ProgramRepo,
  ) {}

  //* Add new program
  async addNewProgram(program: addAndUpdateProgramDto) {
    return await this.programRepo.save(program);
  }

  // * Get all programs
  async getAllPrograms() {
    return await this.programRepo.find();
  }

  //* Get program by id
  async getProgramById(id: number) {
    return await this.programRepo.findOne(id);
  }

  // * Update program
  async updateProgramById(id: number, updatedProgram: addAndUpdateProgramDto) {
    return await null;
  }

  //* deleteProgram
  async deleteProgramById(id: number) {
    return await this.programRepo.delete(id);
  }
}


