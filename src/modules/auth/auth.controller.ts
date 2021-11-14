import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { SETTINGS } from 'src/utils/constants';
import { UserRegisterDto } from '../users/dto/userRegisterDto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './requestWithUser.interface';
Request;
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/register')
  @UsePipes(ValidationPipe)
  async createUser(@Body(SETTINGS.VALIDATION_PIPE) user: UserRegisterDto) {
    return await this.authService.registration(user);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('auth/login')
  async authUser(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/profile')
  // getProfile(@Request() req: RequestWithUser) {
  //   console.log(req.user);
  //   return req.user;
  // }
}
