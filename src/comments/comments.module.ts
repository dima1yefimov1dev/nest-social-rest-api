import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/posts-entity';
import { Comment } from './comments-entity';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  controllers: [CommentsController],
  providers: [CommentsService, PaginationService],
})
export class CommentsModule {}
