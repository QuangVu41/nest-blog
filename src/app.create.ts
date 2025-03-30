import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export function createApp(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger config
  const swaggerConfig = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Nest Blog API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    )
    .addServer('http://localhost:3000')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(ConfigService);

  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId') as string,
      secretAccessKey: configService.get(
        'appConfig.awsSecretAccessKey',
      ) as string,
    },
    region: configService.get('appConfig.awsRegion') as string,
  });

  app.enableCors();
}
