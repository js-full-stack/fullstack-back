import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { addExerciseDto } from 'src/modules/exercises/dto/addExerciseDto';

export class updateProgramDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(10, 200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  exerciseId: number;

  @Type(() => addExerciseDto)
  exercises: addExerciseDto[];
}
