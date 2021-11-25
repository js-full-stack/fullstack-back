
  
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresErrorCode } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { Exercise } from '../exercises/exercise.entity';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { createProgramDto } from './dto/createProgramDto';
import { updateProgramDto } from './dto/updateProgramDto';
import { Program } from './program.entity';
// import { ProgramsForAthletes } from './programsForAthletes.entity';  

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program) private programRepository: Repository<Program>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    // private programsForAthleteRepository: Repository<ProgramsForAthletes>,
    private userService: UserService,
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
          `Program with name ${program.name} alredy exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  // GET ALL PROGRAMS
  async getAllPrograms() {
    return await this.programRepository.find();
  }

  // GET PROGRAM BY ID
  async getProgramById(id: number) {
    return await this.programRepository.findOne(id);
  }

  // UPDATE PROGRAM
  async updateProgram(id: number, program: updateProgramDto) {
    const findProgram = await this.getProgramById(id);

    if (!findProgram) {
      return new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }

    await this.programRepository.update(id, program);
    return await this.getProgramById(id);
  }

  // DELETE PROGRAM
  async deleteProgramById(id: number) {
    return await this.programRepository.delete(id);
  }

  // SUBSCRIBE USER
  async subscribeProgram(data: { programId: number; userId: number }) {
    // const newProgram = this.programRepository.create(data);
    // return await this.programRepository.save(newProgram);
  }
}



