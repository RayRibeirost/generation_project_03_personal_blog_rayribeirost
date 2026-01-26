import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Test: User and Auth Modules', () => {
  let token: any;
  let userId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Must register a new user', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        username: 'Root',
        email: 'root@email.com',
        password: 'root_root',
        photo: '-',
      })
      .expect(201);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    userId = response.body.id;
  });
  it('02 - Do not register duplicate users', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        username: 'Root',
        email: 'root@email.com',
        password: 'root_root',
        photo: '-',
      })
      .expect(400);
  });
  it('03 - User must be authenticated (Login)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        user: 'root@email.com',
        password: 'root_root',
      })
      .expect(200);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    token = response.body.token;
  });
  it('04 - Must list all users', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200);
  });
  it('05 - Must update an User', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: userId,
        username: 'Root Updated',
        email: 'root@email.com',
        password: 'root_root',
        photo: '-',
      })
      .expect(200)
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect('Root Updated').toEqual(response.body.username);
      });
  });
});
