import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Res,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user';
import { User } from 'src/users/users.entity';
import { AuthGuardLocal } from './guards/auth-guard-local';
import { AuthGuardJwt } from './guards/auth-guard-jwt';
import { Response } from 'express';

@Controller('auth')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: User, @Res() res: Response) {
    const token = this.authService.generateTokenForUser(user);
    res
      .cookie('token', token, {
        maxAge: 10000000000,
        httpOnly: true,
      })
      .send({ userId: user.id });
  }

  @Post('signout')
  @UseGuards(AuthGuardJwt)
  async logout(@Res() res: Response) {
    res.clearCookie('token').send({ message: 'successful logout' });
  }

  @Get('profile')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
