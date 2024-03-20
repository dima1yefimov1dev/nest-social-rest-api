import { User } from '../entities/users.entity';

export class UserDto {
  name: string;
  username: string;
  email: string;
  id: number;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
  }
}
