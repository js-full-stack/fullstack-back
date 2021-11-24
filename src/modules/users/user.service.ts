import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/userRegisterDto';
import { UserUpdateDto } from './dto/userUpdateDto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // GET ALL USERS
  async getAllUsers() {
    return await this.userRepository.find();
  }

  // GET USER BY ID
  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  // GET USER BY EMAIL
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  // UPDATE USER
  async updateUserProfile(id: number, user: UserUpdateDto) {
    await this.userRepository.update(id, user);
    return await this.getUserById(id);
  }
}
