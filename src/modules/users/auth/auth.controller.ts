import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { SETTINGS } from 'src/app.utils';
import { UserAuthDto } from '../dto/UserAuthDto';
import { UserRegisterDto } from '../dto/UserRegisterDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async createUser(@Body(SETTINGS.VALIDATION_PIPE) user: UserRegisterDto) {
    return await this.authService.doUserRegistration(user);
  }

  @Post('/login')
  @HttpCode(200)
  async authUser(@Body() userData: UserAuthDto) {
    console.log(userData);
    return await this.authService.doUserAuthenticated(userData);
  }
}
