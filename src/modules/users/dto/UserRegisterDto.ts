import { IsEmail, IsIn, IsNotEmpty, Length, Matches } from 'class-validator';

import { MESSAGES, REGEX } from '../../../app.utils';
import { Role } from '../roles.entity';

export class UserRegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty({ message: 'The user should have a email' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @Length(5, 25)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsNotEmpty()
  role: string;
}
