import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 프론트엔드(Vite 기본 포트) 접근 허용
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
