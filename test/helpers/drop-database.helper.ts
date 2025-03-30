import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService) {
  const AppDatasource = new DataSource({
    type: 'postgres',
    port: +config.get('database.port'),
    username: config.get('database.user'),
    password: config.get('database.password'),
    host: config.get('database.host'),
    database: config.get('database.name'),
    synchronize: config.get('database.synchronize'),
  });

  await AppDatasource.initialize();

  await AppDatasource.dropDatabase();

  await AppDatasource.destroy();
}
