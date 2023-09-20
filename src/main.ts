import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';
import { RemoveSensitiveUserInfoInterceptor } from './shared/interceptors/remove-sensitive-info.interceptor';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.useGlobalPipes(new ValidationPipe())

  // 创建文档
  generateDocument(app)

  app.useGlobalInterceptors(new RemoveSensitiveUserInfoInterceptor())

  await app.listen(3000);
}
bootstrap();

