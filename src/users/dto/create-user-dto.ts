import { IsEmail, IsIn, IsString, Length } from 'class-validator';
import { UserRoles } from 'src/config/user-roles';

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

  @IsIn([UserRoles.MODERATOR, UserRoles.USER])
  role: string;
}
