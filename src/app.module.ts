import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { ProgramModule } from './modules/programs/program.module'
import { ExerciseModule }  from './modules/exercises/exercise.module'

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, ProgramModule, ExerciseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
