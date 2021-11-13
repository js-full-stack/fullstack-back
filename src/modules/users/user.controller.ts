import {
  Controller,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/userUpdateDto';

// GET ALL USERS
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // GET USER BY ID
  @Get('/')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  // GET USER BY EMAIL
  @Get('/:id')
  async getProgramById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  // UPDATE USER
  @Put('/:id')
  async updateUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserUpdateDto,
  ) {
    return await this.userService.updateUserProfile(id, user);
  }
} 
  