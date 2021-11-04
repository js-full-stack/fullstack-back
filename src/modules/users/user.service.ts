
  
import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async doUserRegistration(
    userRegister: UserRegisterDto,
  ): Promise<User> {
    const user = new User();
    user.firstName = userRegister.firstName;
    user.lastName = userRegister.lastName;
    user.email = userRegister.email;
    user.password = userRegister.password;
    user.phone = userRegister.phone;

    return await user.save();
  }
}