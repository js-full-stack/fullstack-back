import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_SECRET } from 'src/app.utils';
import { Role } from '../roles.entity';
import { User } from '../user.entity';
import { UserModule } from '../user.module';
import { UserService } from '../user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './authStrategy/jwt.strategy';
import { LocalStrategy } from './authStrategy/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
