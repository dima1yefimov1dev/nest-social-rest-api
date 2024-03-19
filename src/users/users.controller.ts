import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers() {
    const users = this.usersService.getAllUsers();

    return users;
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUser(id);

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }
}
