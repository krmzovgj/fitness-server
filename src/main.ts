// src/main.ts - RECOMMENDED VERCEL PATTERN
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// NOTE: We don't need ExpressAdapter, express, or serverlessExpress imports anymore

let cachedApp;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Vercel handles app.listen() and Express conversion, 
  // we just need to initialize the application and return the instance
  await app.init();
  return app;
}

export default async (req, res) => {
  if (!cachedApp) {
    // Start Nest only once on cold start
    cachedApp = await bootstrap();
  }
  
  // Use the underlying HTTP server handler (Express) to process the request
  const server = cachedApp.getHttpAdapter().getInstance();
  
  // Return the result of the server's request handling
  return server(req, res);
};