import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';  // Adjust path if needed
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ValidationPipe } from '@nestjs/common';

let cachedApp;  // Cache the initialized app globally (serverless-friendly)

async function getApp() {
    if (!cachedApp) {
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

        await app.init();  // Initializes modules, runs OnModuleInit (e.g., Prisma $connect)
        cachedApp = app;
    }
    return cachedApp;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const app = await getApp();
    const expressHandler = app.getHttpAdapter().getInstance();
    expressHandler(req, res);
}