import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../dto/UserRegisterDto';
import { User } from '../user.entity';
import { Role } from '../roles.entity';
import { PostgresErrorCode } from 'src/app.utils';
import { UserService } from '../user.service';
import { Connection, Repository } from 'typeorm';

export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
    private connection: Connection,
  ) {}

  // REGISTRATION
  async doUserRegistration(user: UserRegisterDto) {
    try {
      const role = new Role();
      role.role = user.role;
      await this.connection.manager.save(role)
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
      sub: user.id,
      email: user.email
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

