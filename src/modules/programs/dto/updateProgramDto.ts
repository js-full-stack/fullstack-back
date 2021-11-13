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
}
