import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const configService = new ConfigService();
  const PORT = parseInt(configService.get<string>('PORT'), 10);
  const ORIGIN = configService.get<string>('CORS_ORIGIN');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
