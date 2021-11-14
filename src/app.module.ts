import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configDb/typeorm.config';

import { UserModule } from './modules/users/user.module';
import { ProgramModule } from './modules/programs/program.module';
import { ExerciseModule } from './modules/exercises/exercise.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './modules/auth/guards/roles-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    ProgramModule,
    ExerciseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
