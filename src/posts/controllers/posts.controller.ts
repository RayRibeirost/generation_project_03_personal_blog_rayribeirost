import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
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
}
