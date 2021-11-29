
  
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresErrorCode } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { createProgramDto } from './dto/createProgramDto';
import { updateProgramDto } from './dto/updateProgramDto';
import { Program } from './program.entity';
import { ProgramsForAthletes } from './programsForAthletes.entity';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,

    @InjectRepository(ProgramsForAthletes)
    private programsForAthleteRepository: Repository<ProgramsForAthletes>,
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
  // Role couch, athlete
  async getAllPrograms(author: User) {
    let allPrograms = [];
    const subscribe = await this.programsForAthleteRepository.find({});
    const subscribeProgramsIds = subscribe.map(({ programId }) => programId);

    if (author.role.role === 'couch') {
      const couchPrograms = await this.programRepository.find({
        author,
      });
      return couchPrograms;
    } else {
      const programs = await this.programRepository.find();

      programs.map((program) => {
        if (subscribeProgramsIds.includes(program.id)) {
          allPrograms.push({ program, isSubscribe: true });
        } else {
          allPrograms.push({ program, isSubscribe: false });
        }
      });

      return allPrograms;
    }
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
  async subscribeUserToProgram(data: { userId: number; programId: number }) {
    const newProgram = this.programsForAthleteRepository.create(data);
    return await this.programsForAthleteRepository.save(newProgram);
  }

  async ubsubscribeUserFromProgram(data: {
    userId: number;
    programId: number;
  }) {
    return await this.programsForAthleteRepository.delete(data);
  }
}  

