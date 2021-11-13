import { Optional } from '@nestjs/common';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateExerciseDto {
  @Optional()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @Optional()
  @IsNotEmpty()
  @Length(10, 200)
  descsripton: string;
}
