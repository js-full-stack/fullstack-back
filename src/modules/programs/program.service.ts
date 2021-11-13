
  
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresErrorCode } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { Exercise } from '../exercises/exercise.entity';
import { User } from '../users/user.entity';
import { createProgramDto } from './dto/createProgramDto';
import { updateProgramDto } from './dto/updateProgramDto';
import { Program } from './program.entity';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program) private programRepository: Repository<Program>,
  ) {}

  // ADD NEW PROGRAM
  async addNewProgram(program: createProgramDto, author: User) {
    try {
      // const newProgram = this.programRepository.create({
      //   ...program,
      //   author,
      // });
      // return await this.programRepository.save(newProgram);

      const newProgram = new Program();
      newProgram.name = program.name;
      newProgram.description = program.description;
      newProgram.price = program.price;
      newProgram.duration = program.duration;

      return this.programRepository.create({
        ...newProgram,
        author,
      });
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        return new HttpException(
          `Program with name ${program.name} alredy exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  // GET ALL PROGRAMS
  async getAllPrograms() {
    return await this.programRepository.find({ relations: ['exercises'] });
  }

  // GET PROGRAM BY ID
  async getProgramById(id: number) {
    return await this.programRepository.findOne(id);
  }

  // UPDATE PROGRAM
  async updateProgram(id: number, program: updateProgramDto) {
    await this.programRepository.update(id, program);
    return await this.getProgramById(id);
  }

  // DELETE PROGRAM
  async deleteProgramById(id: number) {
    return await this.programRepository.delete(id);
  }
}


