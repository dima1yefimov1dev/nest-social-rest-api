import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard-jwt';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User } from 'src/users/users.entity';
import { CreatePostDto } from './dto/create-post-dto';
import { CreateComment } from 'src/comments/dto/create-comment-dto';
import { CommentsService } from 'src/comments/comments.service';
import { UpdatePostDto } from './dto/update-post-dto';

@Controller('posts')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentService: CommentsService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getPost(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getPostById(id);
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async createNewPost(@CurrentUser() user: User, @Body() input: CreatePostDto) {
    return await this.postsService.createNewPost(user, input);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuardJwt)
  async updatePost(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdatePostDto,
  ) {
    return await this.postsService.updatePost(id, input, user);
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuardJwt)
  @HttpCode(204)
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    await this.commentService.deleteAllCommentsById(id);
    await this.postsService.deletePost(id, user);
  }

  @Post('comment/:id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async commentPost(
    @CurrentUser() user: User,
    @Body() input: CreateComment,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const post = await this.postsService.getPostById(id);
    return await this.commentService.createComment(user, input, post);
  }

  @Get('comment/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getCommentsList(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getListOfCommentsOnPost(id);
  }

  @Patch('like/:id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async likePost(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.postsService.toggleLikePost(user, id);
  }

  @Get('like/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getListOfLikes(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getListOfLikesOnPost(id);
  }
}
