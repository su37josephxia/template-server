import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateDocument } from './doc';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import { RemoveSensitiveUserInfoInterceptor } from './shared/interceptors/remove-sensitive-info.interceptor';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });


  app.use(session({

    secret: 'your-secret-key',

    resave: false,

    saveUninitialized: false,

  }));
  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: false
  }))

  app.useGlobalInterceptors(new RemoveSensitiveUserInfoInterceptor())

  const uploadDir = (!!process.env.UPLOAD_DIR && process.env.UPLOAD_DIR !== '') ? process.env.UPLOAD_DIR : join(__dirname, '../../..', 'static/upload')

  app.useStaticAssets(uploadDir, {
    prefix: '/static/upload'
  })

  // 创建文档
  generateDocument(app)

  await app.listen(4000);
}
bootstrap();

