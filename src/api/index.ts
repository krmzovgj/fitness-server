import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ValidationPipe } from '@nestjs/common';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';

let server: any;

async function bootstrap() {
    const expressApp = express();
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

    await app.init(); // important for serverless
    return expressApp;
}

export default async function handler(req: any, res: any) {
    if (!server) {
        const app = await bootstrap();
        server = serverlessExpress({ app });
    }
    return server(req, res);
}
