import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../../posts/entities/posts.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_themes' })
export class Theme {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  description: string;
  @ApiProperty()
  @OneToMany(() => Posts, (post) => post.theme)
  post: Posts[];
}
