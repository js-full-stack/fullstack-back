import { Optional } from '@nestjs/common';
import { IsNotEmpty, Length } from 'class-validator';

export class addExerciseDto {
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsNotEmpty()
  @Length(10, 200)
  description: string;

  @Optional()
  programId: number;
}
