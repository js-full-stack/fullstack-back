import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserUpdateDto } from './dto/UserUpdateDto';
import { Role } from './roles.entity';
import { User } from './user.entity';
import { UserRepo } from './user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepo) private userRepo: UserRepo) {}

  // GET ALL USERS
  async getAllUsers() {
    return await this.userRepo.find({ relations: ['role'] });
  }

  // GET USER BY ID
  async getUserById(id: number) {
    return await this.userRepo.findOne({ where: { id }, relations: ['role'] });
  }

  // GET USER BY EMAIL
  async getUserByEmail(email: string) {
    return await this.userRepo.findOne({ email });
  }

  // UPDATE USER
  async updateUserProfile(id: number, user: UserUpdateDto) {
    await this.userRepo.update(id, user);

    const updatedUserProfile = await this.userRepo.findOne({
      where: { id },
      relations: ['role'],
    });

    return updatedUserProfile;
  }
}
