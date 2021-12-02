import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { addExerciseDto } from 'src/modules/exercises/dto/addExerciseDto';

export class updateProgramDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MinLength(20)
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
