import { IsEmail, IsIn, IsNotEmpty, Length, Matches } from 'class-validator';

import { MESSAGES, REGEX, Role } from '../../../utils/constants';

export class UserRegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @Length(5, 25)
  // @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsIn([Role.ATHLETE, Role.COUCH])
  role: string;
}
