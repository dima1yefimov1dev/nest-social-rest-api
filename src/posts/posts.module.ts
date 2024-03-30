import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Post } from './posts-entity';
import { Comment } from 'src/comments/comments-entity';
import { CommentsService } from 'src/comments/comments.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers: [PostsController],
  providers: [PostsService, CommentsService, PaginationService],
})
export class PostsModule {}
