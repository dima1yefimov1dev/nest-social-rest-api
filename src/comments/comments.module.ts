import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/posts-entity';
import { Comment } from './comments-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
