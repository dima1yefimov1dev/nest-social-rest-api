import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/dtos/create-user-dto';
import { CurrentUser } from './decorators/current-user';
import { User } from 'src/users/entities/users.entity';
import { AuthGuardLocal } from './guards/auth-guard-local';
import { AuthGuardJwt } from './guards/auth-guard-jwt';
import { UserDto } from 'src/dtos/user-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  async registration(@Body() input: CreateUserDto) {
    const user = await this.userService.createNewUser(input);
    const userData = new UserDto(user);
    const token = this.authService.generateTokenForUser(user);

    return { ...userData, token };
  }

  @Post('signin')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: this.authService.generateTokenForUser(user),
    };
  }

  @Get('profile')
  @UseGuards(AuthGuardJwt)
  async getProfile(@CurrentUser() user: User) {
    return new UserDto(user);
  }
}
