import { IsEmail, IsIn, IsNotEmpty, Length, Matches } from 'class-validator';

import { MESSAGES, REGEX } from '../../../app.utils';
import { Role } from '../roles.entity';

export class UserAuthDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
