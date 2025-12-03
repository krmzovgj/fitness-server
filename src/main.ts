import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';

let cachedServer: Handler;

async function bootstrapServer(): Promise<Handler> {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);

    // CORS
    app.enableCors({
      origin: true,
      credentials: true,
    });

    // Validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    // Wrap in serverless-express
    const expressApp = express();
    expressApp.use(app.getHttpAdapter().getInstance()); // attach Nest app to Express
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

// Export handler for Vercel
export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  const srv = await bootstrapServer();
  return srv(event, context, callback);
};
