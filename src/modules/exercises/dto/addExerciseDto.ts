import { IsNotEmpty, IsOptional, Length, MinLength } from 'class-validator';

export class addExerciseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(20)
  description: string;
}
