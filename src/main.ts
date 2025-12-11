// // src/main.ts - RECOMMENDED VERCEL PATTERN
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// // NOTE: We don't need ExpressAdapter, express, or serverlessExpress imports anymore

// let cachedApp;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: true,
//     credentials: true,
//   });

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   // Vercel handles app.listen() and Express conversion, 
//   // we just need to initialize the application and return the instance
//   await app.init();
//   return app;
// }

// export default async (req, res) => {
//   if (!cachedApp) {
//     // Start Nest only once on cold start
//     cachedApp = await bootstrap();
//   }
  
//   // Use the underlying HTTP server handler (Express) to process the request
//   const server = cachedApp.getHttpAdapter().getInstance();
  
//   // Return the result of the server's request handling
//   return server(req, res);
// };

// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let cachedServer; // ← will hold the raw Express server on Vercel

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

  // ←←←← THIS IS THE KEY LINE FOR LOCAL DEV
  await app.listen(process.env.PORT || 3000);

  return app;
}

// ──────────────────────────────────────────────────────────────
// 1. LOCAL DEVELOPMENT → runs normally
// ──────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL) {
  // When you run `npm run start:dev` or `npm run start:prod` locally
  bootstrap();
}

// ──────────────────────────────────────────────────────────────
// 2. VERCEL SERVERLESS → exports handler (runs on cold start)
// ──────────────────────────────────────────────────────────────
export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    const app = await bootstrap();                     // creates Nest app
    cachedServer = app.getHttpAdapter().getInstance();  // extracts Express server
  }
  return cachedServer(req, res);
}