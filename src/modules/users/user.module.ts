import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { UserController } from './user.controller';
import { UserRepo } from './user.repository';
import { AuthController } from './auth/auth.controller';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserRepo])],
  exports: [UserService],
})
export class UserModule {}

