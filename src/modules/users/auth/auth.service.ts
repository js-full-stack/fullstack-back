import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from '../user.repository';
import { UserRegisterDto } from '../dto/UserRegisterDto';
import { User } from '../user.entity';
import { Role } from '../roles/roles.entity';
import { PostgresErrorCode } from 'src/app.utils';
import { UserService } from '../user.service';
import { UserAuthDto } from '../dto/UserAuthDto';

export class AuthService {
  constructor(
    @InjectRepository(UserRepo) private userRepo: UserRepo,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // REGISTRATION
  async doUserRegistration(userRegister: UserRegisterDto) {
    try {
      const user = new User();
      const role = new Role();

      role.role = userRegister.role;
      user.role = role;
      user.firstName = userRegister.firstName;
      user.lastName = userRegister.lastName;
      user.email = userRegister.email;
      user.password = userRegister.password;
      user.phone = userRegister.phone;

      await role.save();
      return await user.save();
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation)
        return new HttpException(
          'User with this email alredy exist',
          HttpStatus.BAD_REQUEST,
        );
    }
    return new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  // AUTHENTICATED
  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      await this.validatePassword(password, user.password);
      return user;
    } catch (error) {
      return new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validatePassword(password: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
  }
  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


