import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}
  async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }
  async findPostById(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    if (!post)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    return post;
  }
  async findAllByTitle(title: string): Promise<Posts[]> {
    return await this.postsRepository.find({
      where: { title: ILike(`%${title}%`) },
    });
  }
  async createPost(post: Posts): Promise<Posts> {
    return await this.postsRepository.save(post);
  }
  async updatePost(post: Posts): Promise<Posts> {
    await this.findPostById(post.id);
    return await this.postsRepository.save(post);
  }
  async deletePost(id: number): Promise<DeleteResult> {
    await this.findPostById(id);
    return await this.postsRepository.delete(id);
  }
}
