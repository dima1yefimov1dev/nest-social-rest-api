import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard-jwt';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User } from './users.entity';

@Controller('users')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers(
    @Query('page', ParseIntPipe) page: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    const users = await this.usersService.getAllUsers(page, offset);
    return users;
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUser(id);

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuardJwt)
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    await this.usersService.deleteUser(id, user);
  }
}
