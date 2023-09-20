import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';
import { RemoveSensitiveUserInfoInterceptor } from './shared/interceptors/remove-sensitive-info.interceptor';
import helmet from 'helmet'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet({}))

  app.useGlobalPipes(new ValidationPipe())

  // 创建文档
  generateDocument(app)

  app.useGlobalInterceptors(new RemoveSensitiveUserInfoInterceptor())

  await app.listen(3000);
}
bootstrap();

