import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserResolver } from './user-resolver';
import { Post } from 'src/posts/posts-entity';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [UsersController],
  providers: [UsersService, UserResolver, PaginationService],
})
export class UsersModule {}
