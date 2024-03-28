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
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard-jwt';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User } from 'src/users/users.entity';
import { UpdateCommentDto } from './dto/update-comment-dto';

@Controller('comments')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  public async getAll() {
    return await this.commentsService.getAllComments();
  }

  @Get(':id')
  public async getCommentById(@Param('id', ParseIntPipe) id: number) {
    return await this.commentsService.getCommentById(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(204)
  public async deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return await this.commentsService.deleteComment(id, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body() input: UpdateCommentDto,
  ) {
    return await this.commentsService.updateComment(id, user, input);
  }
}
