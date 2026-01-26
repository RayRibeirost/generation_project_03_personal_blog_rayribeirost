import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../../posts/entities/posts.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_users' })
export class Users {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  @MinLength(3)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'email@email.com' })
  email: string;
  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  password: string;
  @Column({ length: 5000 })
  @ApiProperty()
  photo: string;
  @ApiProperty()
  @OneToMany(() => Posts, (post) => post.user)
  post: Posts[];
}
