import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramController } from './program.controller';
import { ProgramRepo } from './program.repository';
import { ProgramService } from './program.service';

@Module({
  controllers: [ProgramController],
  providers: [ProgramService],
  imports: [TypeOrmModule.forFeature([ProgramRepo])],
})
export class ProgramModule {}
