import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Theme } from '../../theme/entities/theme.entity';
import { Users } from '../../user/entities/user.entity';

@Entity({ name: 'tb_posts' })
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  title: string;
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  text: string;
  @UpdateDateColumn()
  post_date: Date;
  @ManyToOne(() => Theme, (theme) => theme.post, { onDelete: 'CASCADE' })
  theme: Theme;
  @ManyToOne(() => Users, (user) => user.post, { onDelete: 'CASCADE' })
  user: Users;
}
