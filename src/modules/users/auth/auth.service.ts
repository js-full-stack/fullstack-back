import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepo } from '../user.repository';
import { UserRegisterDto } from '../dto/UserRegisterDto';
import { User } from '../user.entity';
import { Role } from '../roles.entity';
import { PostgresErrorCode } from 'src/app.utils';
import { UserService } from '../user.service';
import { UserAuthDto } from '../dto/UserAuthDto';

export class AuthService {
  constructor(
    @InjectRepository(UserRepo) private userRepo: UserRepo,
    private userService: UserService,
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
  async doUserAuthenticated(userData: UserAuthDto) {
    try {
      const user = await this.userService.getUserByEmail(userData.email);
      if (!user) {
        return new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }

      await bcrypt.compare(userData.password, user.password);
      return user;
    } catch (error) {
      return new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
