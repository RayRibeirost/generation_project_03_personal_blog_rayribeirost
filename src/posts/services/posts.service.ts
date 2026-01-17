import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ThemeService } from '../../theme/services/theme.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
    private themeService: ThemeService,
  ) {}
  async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find({ relations: { theme: true } });
  }
  async findPostById(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: { theme: true },
    });
    if (!post)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    return post;
  }
  async findAllByTitle(title: string): Promise<Posts[]> {
    return await this.postsRepository.find({
      where: { title: ILike(`%${title}%`) },
      relations: { theme: true },
    });
  }
  async createPost(post: Posts): Promise<Posts> {
    await this.themeService.findById(post.theme.id);
    return await this.postsRepository.save(post);
  }
  async updatePost(post: Posts): Promise<Posts> {
    await this.findPostById(post.id);
    await this.themeService.findById(post.theme.id);
    return await this.postsRepository.save(post);
  }
  async deletePost(id: number): Promise<DeleteResult> {
    await this.findPostById(id);
    return await this.postsRepository.delete(id);
  }
}
