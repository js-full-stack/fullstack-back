import { Optional } from '@nestjs/common';
import { IsNotEmpty, Length, MinLength } from 'class-validator';

export class UpdateExerciseDto {
  @Optional()
  @IsNotEmpty()
  name: string;

  @Optional()
  @IsNotEmpty()
  @MinLength(20)
  descsripton: string;
}
