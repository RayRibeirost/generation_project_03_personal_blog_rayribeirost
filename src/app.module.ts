import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts/entities/posts.entity';
import { PostsModule } from './posts/posts.module';
import { Theme } from './theme/entities/theme.entity';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dev',
      password: 'dev@145R',
      database: 'db_personalblog',
      entities: [Posts, Theme],
      synchronize: true,
    }),
    PostsModule,
    ThemeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
