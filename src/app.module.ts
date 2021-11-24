import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configDb/typeorm.config';

import { UserModule } from './modules/users/user.module';
import { ProgramModule } from './modules/programs/program.module';
import { ExerciseModule } from './modules/exercises/exercise.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    ProgramModule,
    ExerciseModule,
  ],
})
export class AppModule {}
