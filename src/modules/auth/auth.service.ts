import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../users/dto/userRegisterDto';
import { User } from '../users/user.entity';
import { Role } from '../users/roles.entity';
import { PostgresErrorCode } from 'src/utils/constants';
import { UserService } from '../users/user.service';
import { Connection, Repository } from 'typeorm';

export class AuthService {
  constructor(
    @InjectRepository(User)
    private userService: UserService,
    private jwtService: JwtService,
    private connection: Connection,
  ) {}

  // REGISTRATION
  async registration(user: UserRegisterDto) {
    try {
      const role = new Role();
      role.role = user.role;
      const newUser = new User();

      newUser.firstName = user.firstName;
      newUser.lastName = user.lastName;
      newUser.phone = user.phone;
      newUser.email = user.email;
      newUser.password = user.password;
      newUser.role = role;

      return await this.connection.manager.save(newUser);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation)
        return new HttpException(
          `User with this email alredy exist`,
          HttpStatus.BAD_REQUEST,
        );
    }
    return new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  // LOGIN
  async login(user: User) {
    const payload = {
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
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
}
