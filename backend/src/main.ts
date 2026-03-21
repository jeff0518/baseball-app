import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local if it exists
const envPath = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: path.join(__dirname, '..', envPath) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`NestJS backend running on http://0.0.0.0:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start NestJS app:', err);
  process.exit(1);
});
