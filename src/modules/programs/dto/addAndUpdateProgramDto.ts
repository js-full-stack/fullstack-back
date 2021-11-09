import { IsNotEmpty, Length } from 'class-validator';

export class addAndUpdateProgramDto {
  @IsNotEmpty()
  @Length(5, 50)
  programName: string;

  @IsNotEmpty()
  @Length(10, 200)
  programDesc: string;

  @IsNotEmpty()
  programPrice: number;

  @IsNotEmpty()
  programDuration: number;
}
