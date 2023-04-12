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

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        // 设置 Cookie 的 SameSite 属性为 'none'，并启用 Secure 标志以确保只有 HTTPS 连接才能发送 Cookie
        sameSite: 'none',
        secure: true,
      },
    }),
  );

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    // }
    next();
  });

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

