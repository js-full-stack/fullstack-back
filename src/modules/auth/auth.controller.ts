import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  UseGuards,
  Request,
  Response,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Res,
} from '@nestjs/common';

import { SETTINGS } from 'src/utils/constants';
import { UserRegisterDto } from '../users/dto/userRegisterDto';
import { AuthService, tokens } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './authUser.interface';
import { UserService } from '../users/user.service';
// import {  } from 'passport';
@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('auth/register')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async createUser(@Body(SETTINGS.VALIDATION_PIPE) user: UserRegisterDto) {
    try {
      return await this.authService.registration(user);
    } catch (error) {
      throw error
      
    }
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('auth/login')
  async authUser(@Request() req: RequestWithUser) {
    try {
      const token = await this.authService.login(req.user);
      const user = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        phone: req.user.phone,
        role: req.user.role.role,
        id: req.user.id,
        token: token.access_token,
      };
      return { user };
    } catch (error) {
     return {error: error.message}
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  logOut(@Request() req, res) {
    req.logout();
    // res.redirect('/')
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req: RequestWithUser) {
    const userProfile = await this.userService.getUserById(req.user.id);
    const user = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      phone: userProfile.phone,
      role: userProfile.role.role,
      id: userProfile.id,
    };
    return user;
    // return req.user.id;
  }
}
   