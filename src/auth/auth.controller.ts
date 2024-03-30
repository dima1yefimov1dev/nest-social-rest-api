import {
  Body,
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
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { TOKEN_LIFETIME } from 'src/config/config-constants';

@Controller('auth')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signin')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: User, @Res() res: Response) {
    const token = this.authService.generateTokenForUser(user);
    res
      .cookie('token', token, {
        maxAge: TOKEN_LIFETIME,
        httpOnly: true,
      })
      .send({ userId: user.id });
  }

  @Post('signout')
  @UseGuards(AuthGuardJwt)
  async logout(@Res() res: Response) {
    res.clearCookie('token').send({ message: 'successful logout' });
  }

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  public async registration(@Body() input: CreateUserDto) {
    return await this.usersService.createNewUser(input);
  }

  @Get('profile')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
