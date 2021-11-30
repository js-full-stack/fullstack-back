import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../exercises/exercise.entity';
import { ExerciseModule } from '../exercises/exercise.module';
import { User } from '../users/user.entity';
import { UserModule } from '../users/user.module';
import { ProgramController } from './program.controller';
import { Program } from './program.entity';
import { ProgramService } from './program.service';
import { ProgramsForAthletes } from './programsForAthletes.entity';

@Module({
  controllers: [ProgramController],
  providers: [ProgramService],
  imports: [
    TypeOrmModule.forFeature([Program, Exercise, User, ProgramsForAthletes]),
    UserModule,
  ],
  exports: [ProgramService],
})
export class ProgramModule {}
  