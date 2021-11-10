
  
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addAndUpdateProgramDto } from './dto/addAndUpdateProgramDto';
import { ProgramRepo } from './program.repository';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramRepo) private programRepo: ProgramRepo,
  ) {}

  // ADD NEW PROGRAM
  async addNewProgram(program: addAndUpdateProgramDto) {
    return await this.programRepo.save(program);
  }

  // GET ALL PROGRAMS
  async getAllPrograms() {
    return await this.programRepo.find();
  }

  // GET PROGRAM BY ID
  async getProgramById(id: number) {
    return await this.programRepo.findOne(id);
  }

  // UPDATE PROGRAM
  async updateProgram(id: number, updatedProgram: addAndUpdateProgramDto) {
    const program = await this.programRepo.findOne({
      where: { id },
    });
    return program;
  }

  // DELETE PROGRAM
  async deleteProgramById(id: number) {
    return await this.programRepo.delete(id);
  }
}


