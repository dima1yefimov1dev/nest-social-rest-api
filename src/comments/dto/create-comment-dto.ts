import { IsString, MaxLength } from 'class-validator';

export class CreateComment {
  @IsString()
  @MaxLength(250)
  body: string;
}
