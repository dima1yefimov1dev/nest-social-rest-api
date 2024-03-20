import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async createNewUser(user: CreateUserDto) {
    const { name, username, email, password } = user;
    const isNotUniqueEmail = await this.repository.findOne({
      where: { email },
    });
    const isNotUniqueUsername = await this.repository.findOne({
      where: { username },
    });

    if (isNotUniqueEmail || isNotUniqueUsername) {
      throw new BadRequestException(
        'user with this email or username already exists',
      );
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = this.repository.create({
      name,
      username,
      password: hashedPassword,
      email,
    });

    await this.repository.save(newUser);

    return newUser;
  }

  public async getAllUsers() {
    const users = await this.repository.find();

    return users;
  }

  public async getUser(id: number) {
    const options: FindOneOptions<User> = {
      where: { id },
    };

    const user = await this.repository.findOne(options);

    if (!user) {
      throw new NotFoundException(`No user with such id: ${id}`);
    }

    return user;
  }

  public async deleteUser(id: number) {
    const userToDelete = await this.repository.findOne({ where: { id } });

    if (!userToDelete) {
      throw new NotFoundException(`User with this id ${id} don't exist`);
    }

    const deletedUser = await this.repository.delete({ id });

    return deletedUser;
  }

  public async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
