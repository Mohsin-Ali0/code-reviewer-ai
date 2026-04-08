import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class ReviewCodeDto {
  @IsString()
  @MinLength(10, { message: 'Code must be at least 10 characters' })
  @MaxLength(50000, { message: 'Code must be less than 50000 characters' })
  code: string;

  @IsString()
  language: string;

  @IsOptional()
  @IsString()
  context?: string;
}
