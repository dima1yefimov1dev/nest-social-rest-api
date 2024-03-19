import { User } from 'src/users/entities/users.entity';

export class UserDto {
  id: number;
  username: string;
  email: string;
  name: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.name = user.name;
  }
}
