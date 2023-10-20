import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import validationOptions from './validation-options';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('PxlNode - Ads API')
    .setDescription('Api for PxlNode Ads')
    .setVersion('1.0')
    .addBearerAuth()
    // .addApiKey(
    //   {
    //     type: 'apiKey',
    //     name: 'x-api-key',
    //     in: 'header',
    //   },
    //   'x-api-key',
    // )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Docs | AdSense',
  });

  await app.listen(3000);
}
bootstrap();
