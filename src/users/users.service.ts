import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { SALT } from 'src/config/config-constants';
import { PaginationService } from 'src/pagination/pagination.service';
import { UserRoles } from 'src/config/user-roles';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly paginationService: PaginationService,
  ) {}

  public async createNewUser(user: CreateUserDto) {
    const { name, username, email, password } = user;

    const hashedPassword = await this.hashPassword(password);

    const newUser = this.repository.create({
      name,
      username,
      password: hashedPassword,
      email,
    });

    try {
      await this.repository.save(newUser);
      return newUser;
    } catch (error) {
      throw new BadRequestException(
        'User with this email or username already exists',
      );
    }
  }

  public async getAllUsers(page: number, offset: number) {
    const users = await this.repository.find();

    return this.paginationService.paginate(users, page, offset);
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

  public async deleteUser(id: number, user: User) {
    if (user.role !== UserRoles.ADMIN) {
      throw new ForbiddenException('Only administrator can delete users');
    }

    const userToDelete = await this.repository.findOne({ where: { id } });

    if (!userToDelete) {
      throw new NotFoundException(`User with this id ${id} don't exist`);
    }

    const deletedUser = await this.repository.delete({ id });

    return deletedUser;
  }

  public async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT);
  }
}
