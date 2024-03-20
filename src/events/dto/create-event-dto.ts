import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(5, 40)
  name: string;

  @Length(3, 20)
  @IsString()
  description: string;

  @IsDateString()
  when: string;

  @IsString()
  @Length(5)
  address: string;
}
