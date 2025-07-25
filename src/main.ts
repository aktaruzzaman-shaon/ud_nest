import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS Masterclas - Blog app API')
    .setDescription('Use the bese API url as http://localhost:3000')
    .setTermsOfService('https://localhost:3000/terms-of-service')
    .setLicense('MIT', 'https://opensource.org/license/mit/')
    .addServer('http://localhost:3000', 'Development server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
