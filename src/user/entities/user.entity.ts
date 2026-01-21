import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../../posts/entities/posts.entity';

@Entity({ name: 'tb_users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @MinLength(3)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  email: string;
  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  password: string;
  @Column({ length: 5000 })
  photo: string;
  @OneToMany(() => Posts, (post) => post.user)
  post: Posts[];
}
