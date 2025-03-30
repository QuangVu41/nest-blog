import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstrapApp } from 'test/helpers/bootstrap-app.helper';
import {
  completeUser,
  missingEmail,
  missingFirstName,
  missingPassword,
} from './users.post.sample';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;

  beforeEach(async () => {
    app = await bootstrapApp();
    config = app.get<ConfigService>(ConfigService);
  });

  it('/users - Endpoint is public', () => {
    return request(app.getHttpServer()).post('/users').send({}).expect(400);
  });

  it('/users - firstName is mandatory', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(missingFirstName)
      .expect(400);
  });

  it('/users - email is mandatory', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(missingEmail)
      .expect(400);
  });

  it('/users - password is mandatory', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(missingPassword)
      .expect(400);
  });

  it('/users - Valid request successfully creates user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data).toBeDefined();
        expect(body.data.firstName).toBe(completeUser.firstName);
        expect(body.data.lastName).toBe(completeUser.lastName);
        expect(body.data.email).toBe(completeUser.email);
      });
  });

  it('/users - password is not returned in response', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.password).toBeUndefined();
      });
  });
  it('/users - googleId is not returned in response', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.googleId).toBeUndefined();
      });
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });
});
