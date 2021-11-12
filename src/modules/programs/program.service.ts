
  
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresErrorCode } from 'src/app.utils';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { createProgramDto } from './dto/createProgramDto';
import { Program } from './program.entity';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program) private programRepository: Repository<Program>,
  ) {}

  // ADD NEW PROGRAM
  async addNewProgram(program: createProgramDto, author: User) {
    try {
      const newProgram = this.programRepository.create({
        ...program,
        author,
      });
      return await this.programRepository.save(newProgram);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        return new HttpException(
          `Program with name ${program.programName} alredy exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  // GET ALL PROGRAMS
  async getAllPrograms() {
    return await this.programRepository.find({ relations: ['author'] });
  }

  // GET PROGRAM BY ID
  async getProgramById(id: number) {
    return await this.programRepository.findOne(id, { relations: ['author'] });
  }

  // UPDATE PROGRAM
  async updateProgram(id: number, updatedProgram: createProgramDto) {
    const program = await this.programRepository.findOne({
      where: { id },
    });
    return program;
  }

  // DELETE PROGRAM
  async deleteProgramById(id: number) {
    return await this.programRepository.delete(id);
  }
}


