import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  title: string;

  @IsNotEmpty()
  @MinLength(25)
  @IsString()
  body: string;
}
