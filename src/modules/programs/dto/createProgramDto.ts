import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { User } from 'src/modules/users/user.entity';

export class createProgramDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
