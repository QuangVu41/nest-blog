import { Test, TestingModule } from '@nestjs/testing';
import { createApp } from 'src/app.create';
import { AppModule } from 'src/app.module';

export async function bootstrapApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  createApp(app);
  await app.init();
  return app;
}
