import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Service is up. listen on port ${process.env.APP_PORT}`);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
