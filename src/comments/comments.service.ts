import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comments-entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { CreateComment } from './dto/create-comment-dto';
import { Post } from 'src/posts/posts-entity';
import { UpdateCommentDto } from './dto/update-comment-dto';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
    private readonly paginationService: PaginationService,
  ) {}

  public async getCommentById(id: number) {
    const comment = await this.repository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException(`comment doesn't exist`);
    }

    return comment;
  }

  public async createComment(user: User, input: CreateComment, post: Post) {
    const newComment = this.repository.create({
      ...input,
      post,
      postId: post.id,
      userId: user.id,
    });

    await this.repository.save(newComment);

    return newComment;
  }

  public async getAllComments(page: number, offset: number) {
    const comments = await this.repository.find();

    return this.paginationService.paginate(comments, page, offset);
  }

  public async deleteAllCommentsById(postId: number) {
    const commentsToDelete = await this.repository.find({
      where: {
        postId,
      },
    });

    if (!commentsToDelete) {
      throw new NotFoundException('Comments don`t exist on this post');
    }

    return await this.repository.remove(commentsToDelete);
  }

  public async deleteComment(id: number, user: User) {
    const commentToDelete = await this.getCommentById(id);
    if (!commentToDelete) {
      throw new NotFoundException('comment doesn`t exist');
    }

    if (commentToDelete.userId !== user.id) {
      throw new ForbiddenException(' You have no access to these actions');
    }

    return await this.repository.remove(commentToDelete);
  }

  public async updateComment(id: number, user: User, input: UpdateCommentDto) {
    const commentToUpdate = await this.getCommentById(id);

    if (!commentToUpdate) {
      throw new NotFoundException(`comment doesn't exist`);
    }

    if (commentToUpdate.userId !== user.id) {
      throw new ForbiddenException(`You have no access to these actions `);
    }

    const updatedComment = Object.assign(commentToUpdate, input);

    return await this.repository.save(updatedComment);
  }
}
