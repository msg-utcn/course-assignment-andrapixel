/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { QuestionManagementConfig } from './app/question-management/question-management.config';
import { UsersConfig } from './app/users/users.config';
import { AuthConfig } from './app/auth/auth.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const version = '1.0';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('StackUnderflow API')
    .setDescription('The UTCN Course API for Question Management')
    .setVersion(version)
    .addTag(QuestionManagementConfig.SWAGGER_FEATURE)
    .addTag(UsersConfig.SWAGGER_FEATURE)
    .addTag(AuthConfig.SWAGGER_FEATURE)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
