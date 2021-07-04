import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './app-config/app-config.service';
import { json } from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = app.get(AppConfigService);
  app.use(json({ limit: '50mb' }));
  await app.listen(config.port);

  console.log(`Server listening on http://localhost:${config.port}`);
  return '';
}

bootstrap();
