import { IsEmail, IsIn, IsNotEmpty, Length, Matches } from 'class-validator';

import { MESSAGES, REGEX, userRoles } from '../../../utils/constants';
userRoles;
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

  @IsIn([userRoles.Athlete, userRoles.Couch])
  role: string;
}
