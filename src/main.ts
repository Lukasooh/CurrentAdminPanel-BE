import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();      // ← this lets your React app talk to it
  await app.listen(3000);
  console.log('Backend running on http://localhost:3000');
}
bootstrap();
