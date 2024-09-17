import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Quiz System')
    .setDescription('The quiz system API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000/')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // apply bearer auth to all endpoints
  document.components.securitySchemes = {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  };
  document.security = [
    {
      BearerAuth: [],
    },
  ];

  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
