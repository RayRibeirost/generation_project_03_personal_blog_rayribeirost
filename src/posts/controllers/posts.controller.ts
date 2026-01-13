import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
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
  
}
