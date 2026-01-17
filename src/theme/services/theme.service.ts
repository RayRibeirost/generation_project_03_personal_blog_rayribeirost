import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from '../entities/theme.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme)
    private themeRepository: Repository<Theme>,
  ) {}
  async findAll(): Promise<Theme[]> {
    return await this.themeRepository.find({
      relations: {
        post: true,
      },
    });
  }
  async findById(id: number): Promise<Theme> {
    const theme = await this.themeRepository.findOne({
      where: { id },
      relations: { post: true },
    });
    if (!theme)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
    return theme;
  }
  async findAllByDescription(description: string): Promise<Theme[]> {
    return await this.themeRepository.find({
      where: { description: ILike(`%${description}%`) },
      relations: { post: true },
    });
  }
  async create(theme: Theme): Promise<Theme> {
    return await this.themeRepository.save(theme);
  }
  async update(theme: Theme): Promise<Theme> {
    await this.findById(theme.id);
    return await this.themeRepository.save(theme);
  }
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.themeRepository.delete(id);
  }
}
