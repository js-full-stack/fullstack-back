import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { SETTINGS } from 'src/app.utils';
import { User } from './user.entity'



@Controller('user')
  
export class UserController {
  constructor(private userService: UserService) {}


  @Post('/create')
  @UsePipes(ValidationPipe)
  
  async createUser(@Body(SETTINGS.VALIDATION_PIPE) userRegister: UserRegisterDto,
  ): Promise<User> {
    return await this.userService.doUserRegistration(userRegister)
  }
} 
