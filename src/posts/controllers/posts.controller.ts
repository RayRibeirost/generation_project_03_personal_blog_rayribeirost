import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { Posts } from '../entities/posts.entity';

@Controller('/postagens')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findPostById(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    return this.postsService.findPostById(id);
  }
  @Get('/titulo/:title')
  @HttpCode(HttpStatus.OK)
  findAllByTitle(@Param('title') title: string): Promise<Posts[]> {
    return this.postsService.findAllByTitle(title);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPost(@Body() post: Posts): Promise<Posts> {
    return this.postsService.createPost(post);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  updatePost(@Body() post: Posts): Promise<Posts> {
    return this.postsService.updatePost(post);
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
