import { IsNotEmpty, Length } from 'class-validator';

export class AddAndUpdateExerciseDto {
  @IsNotEmpty()
  @Length(5, 50)
  exerciseName: string;

  @IsNotEmpty()
  @Length(10, 200)
  exerciseDesc: string;
}
