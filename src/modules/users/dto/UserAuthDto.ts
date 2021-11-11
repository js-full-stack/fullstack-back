import { IsNotEmpty } from 'class-validator';

export class UserAuthDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
