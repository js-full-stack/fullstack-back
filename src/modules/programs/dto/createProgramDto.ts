import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { User } from 'src/modules/users/user.entity';

export class createProgramDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  programName: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 200)
  programDesc: string;

  @IsNotEmpty()
  @IsNumber()
  programPrice: number;

  @IsNotEmpty()
  @IsNumber()
  programDuration: number;
}
