import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class updateProgramDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  @IsOptional()
  programName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(10, 200)
  programDesc: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  programPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  programDuration: number;
}
