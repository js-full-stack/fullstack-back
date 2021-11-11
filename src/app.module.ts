import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { UserModule } from './modules/users/user.module';
import { ProgramModule } from './modules/programs/program.module';
import { ExerciseModule } from './modules/exercises/exercise.module';
import { AuthModule } from './modules/users/auth/auth.module';
import { CaslModule } from './modules/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    ProgramModule,
    ExerciseModule,
    CaslModule,
  ],
})
export class AppModule {}
