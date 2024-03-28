import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './posts-entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post-dto';
import { User } from 'src/users/users.entity';
import { UpdatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
  ) {}

  public async getAllPosts() {
    return await this.repository.find();
  }

  public async getPostById(id: number, optionsRelations?: string | string[]) {
    const queryOptions: FindOneOptions<Post> = { where: { id } };

    if (optionsRelations) {
      queryOptions.relations = Array.isArray(optionsRelations)
        ? [...optionsRelations]
        : [optionsRelations];
    }

    const postToFind = await this.repository.findOne(queryOptions);

    if (!postToFind) {
      throw new NotFoundException(`post doesn't exist `);
    }

    return postToFind;
  }

  public async createNewPost(user: User, input: CreatePostDto) {
    const newPost = this.repository.create({
      ...input,
      userId: user.id,
      creator: user,
    });

    await this.repository.save(newPost);

    return newPost;
  }

  public async toggleLikePost(user: User, id: number) {
    const postToLike = await this.getPostById(id, 'likes');

    if (!postToLike) {
      throw new Error('Post not found');
    }

    const alreadyLikedIndex = postToLike.likes.findIndex(
      (likedUser) => likedUser.id === user.id,
    );

    if (alreadyLikedIndex === -1) {
      postToLike.likes.push(user);
    } else {
      postToLike.likes.splice(alreadyLikedIndex, 1);
    }

    console.log(postToLike.likes.length);
    return this.repository.save(postToLike);
  }

  public async getListOfLikesOnPost(id: number) {
    const post = await this.getPostById(id, 'likes');

    if (!post) {
      throw new NotFoundException(`such post doesn't exist`);
    }

    return [...post.likes];
  }

  public async getListOfCommentsOnPost(id: number) {
    const post = await this.getPostById(id, 'comments');

    if (!post) {
      throw new NotFoundException(`this post doesn't exist`);
    }

    return [...post.comments];
  }

  public async updatePost(id: number, options: UpdatePostDto, user: User) {
    const postToUpdate = await this.getPostById(id);

    if (!postToUpdate) {
      throw new NotFoundException(`This post doesn't exist`);
    }

    if (postToUpdate.userId !== user.id) {
      throw new ForbiddenException(`You have no access to this action`);
    }
    Object.assign(postToUpdate, options);

    const updatedPost = await this.repository.save(postToUpdate);
    return updatedPost;
  }

  public async deletePost(id: number, user: User) {
    const postToDelete = await this.getPostById(id);

    if (!postToDelete) {
      throw new NotFoundException('this post doesn`t exist ');
    }

    if (postToDelete.userId !== user.id) {
      throw new ForbiddenException(` You have no access to these actions`);
    }

    return await this.repository.remove(postToDelete);
  }
}
