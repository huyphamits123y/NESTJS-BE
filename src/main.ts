import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Địa chỉ của ReactJS
    methods: 'GET,POST,PUT,DELETE', // Các phương thức HTTP được phép
    credentials: true, // Nếu bạn sử dụng cookie hoặc xác thực
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,  // Bật tự động chuyển đổi kiểu dữ liệu
  }));
  app.setGlobalPrefix('api/v1');
  await app.listen(3001);
}
bootstrap();
