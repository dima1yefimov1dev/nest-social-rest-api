import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 15)
  @IsString()
  name: string;

  @Length(5, 15)
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @Length(5)
  @IsString()
  password: string;
}
