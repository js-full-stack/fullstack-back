import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';


import { UserModule } from './modules/users/user.module';
import { ProgramModule } from './modules/programs/program.module'
import { ExerciseModule }  from './modules/exercises/exercise.module'

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, ProgramModule, ExerciseModule],

})
export class AppModule {}
