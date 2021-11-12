import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramController } from './program.controller';
import { Program } from './program.entity';
import { ProgramService } from './program.service';

@Module({
  controllers: [ProgramController],
  providers: [ProgramService],
  imports: [TypeOrmModule.forFeature([Program])],
})
export class ProgramModule {}
