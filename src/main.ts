import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import * as dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { ApiLoggerMiddleware } from './middleware/api-logger.middleware';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());

  // Rate limiter
  app.use(
    rateLimit({
      windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_MAX) || 100,
    }),
  );

  // API logger (using the existing middleware implementation)
  app.use((req, res, next) => new ApiLoggerMiddleware().use(req, res, next));

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Serve all routes under /api to match previous express routes
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`NestJS app listening on port ${port}`);
}

bootstrap();
