import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global prefix
  app.setGlobalPrefix('api/v1');

  // protect app from brute-force attacks
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  Logger.log(`listening on port ${PORT}`);
}
bootstrap();
