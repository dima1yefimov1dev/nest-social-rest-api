import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public generateTokenForUser(user: User) {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }
}
