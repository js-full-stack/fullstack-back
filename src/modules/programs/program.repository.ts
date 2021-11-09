import { EntityRepository, Repository } from 'typeorm';
import { Program } from './program.entity';

@EntityRepository(Program)
export class ProgramRepo extends Repository<Program> {}
