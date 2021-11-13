import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';

import * as bcrypt from 'bcrypt';

import { MESSAGES, REGEX } from '../../../utils/constants';
import { BeforeInsert } from 'typeorm';

export class UserUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsNotEmpty({ message: 'The user should have a email' })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  @Length(5, 25)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
