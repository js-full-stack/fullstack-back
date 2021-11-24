import { IsNotEmpty, IsOptional, Length, MinLength } from 'class-validator';

export class addExerciseDto {
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsNotEmpty()
  @MinLength(20)
  description: string;
}
