import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal - Raylander Ribeiro - rayribeirost')
    .setDescription(
      'Projeto Blog Pessoal, feito no bootcamp de desenvolvimento fullstack typescript da Generation Brasil',
    )
    .setContact(
      'Raylander Ribeiro - rayribeirost - Generation Brasil',
      'https://www.linkedin.com/in/raylanderribeiro/',
      'raylanderr@genstudents.org',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
