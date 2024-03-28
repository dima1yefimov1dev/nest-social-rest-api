import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user-dto';

@Controller('users')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers() {
    const users = await this.usersService.getAllUsers();

    return users;
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUser(id);

    return user;
  }

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async registration(@Body() input: CreateUserDto) {
    const newUser = await this.usersService.createNewUser(input);

    return newUser;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }
}
