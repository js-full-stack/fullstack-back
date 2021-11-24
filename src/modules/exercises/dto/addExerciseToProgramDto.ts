import { IsNotEmpty } from 'class-validator';

export class addExerciseToProgramDto {
  @IsNotEmpty()
  programId: number;

  @IsNotEmpty()
  exerciseId: number;
}
