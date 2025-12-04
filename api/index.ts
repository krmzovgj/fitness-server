import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ValidationPipe } from '@nestjs/common';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer; 

async function bootstrap() {
    if (!cachedServer) {
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

        await app.init(); // Runs OnModuleInit (e.g., Prisma $connect)

        const expressApp = app.getHttpAdapter().getInstance();
        cachedServer = serverlessExpress({ app: expressApp });
    }
    return cachedServer;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const server = await bootstrap();
    return server(req, res);
}
