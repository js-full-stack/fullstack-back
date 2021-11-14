import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/authStrategy/jwt.strategy';
import { RolesGuard } from '../auth/guards/roles-auth.guard';
import { ProgramController } from './program.controller';
import { Program } from './program.entity';
import { ProgramService } from './program.service';

@Module({
  controllers: [ProgramController],
  providers: [ProgramService, JwtStrategy],
  imports: [TypeOrmModule.forFeature([Program])],
  exports: [ProgramService],
})
export class ProgramModule {}
