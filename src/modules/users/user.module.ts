import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { UserController } from './user.controller';
import { AuthController } from '../auth/auth.controller';
import { User } from './user.entity';
import { APP_GUARD } from '@nestjs/core';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  // exports: [UserService],
})
export class UserModule {}

