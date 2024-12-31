import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { Response } from './common/response';
import * as session from 'express-session'



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(session({
    secret: 'zhangyihang',
    name: 'rules.session',
    rolling: true,
    cookie: {
      maxAge: 9999999
    }
  }))

  app.setGlobalPrefix('api'); // 设置全局前缀为 'api'

  app.useGlobalPipes(new ValidationPipe()) // 全局交验，无需手动单个配置

  app.useGlobalInterceptors(new Response()) // 全局拦截器，拦截响应配置统一返回格式

  await app.listen(3000);
}
bootstrap();
