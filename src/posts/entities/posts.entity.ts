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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_posts' })
export class Posts {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  text: string;
  @ApiProperty()
  @UpdateDateColumn()
  post_date: Date;
  @ApiProperty({ type: () => Theme })
  @ManyToOne(() => Theme, (theme) => theme.post, { onDelete: 'CASCADE' })
  theme: Theme;
  @ApiProperty({ type: () => Users })
  @ManyToOne(() => Users, (user) => user.post, { onDelete: 'CASCADE' })
  user: Users;
}
