import { IsString, Length, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 15)
  title: string;

  @IsString()
  @MaxLength(100)
  body: string;
}
