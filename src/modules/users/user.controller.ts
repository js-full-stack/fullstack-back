import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { SETTINGS } from 'src/app.utils';
import { User } from './user.entity';
import { UserUpdateDto } from './dto/UserUpdateDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}


  @Get('/')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getProgramById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Put('/:id')
  async updateUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserUpdateDto,
  ) {
    return await this.userService.updateUserProfile(id, user);
  }
} 
