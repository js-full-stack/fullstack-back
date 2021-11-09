
  
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { Role } from './roles.entity';
import { User } from './user.entity';
import { UserRepo } from './user.repository';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepo) private userRepo: UserRepo) {}

  async doUserRegistration(userRegister: UserRegisterDto) {
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
  }

  async getAllUsers() {
    return await this.userRepo.find({ relations: ['role'] });
  }

  async getUserById(id: number) {
    return await this.userRepo.findOne({ where: { id }, relations: ['role'] });
  }

  async updateUserProfile(id: number, userRegister: UserRegisterDto) {
    const userProfile = await this.userRepo.findOne(id);

    userProfile.firstName = userRegister.firstName;
    userProfile.lastName = userRegister.lastName;
    userProfile.email = userRegister.email;
    userProfile.password = userRegister.password;
    userProfile.phone = userRegister.phone;

    await userProfile.save();
  }
}