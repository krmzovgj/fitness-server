import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ValidationPipe } from '@nestjs/common';
import serverlessExpress from '@vendia/serverless-express';

let server: any;

async function bootstrap() {
    // Create Nest app normally
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

    await app.init();

    // Get the underlying Express instance
    const expressApp = app.getHttpAdapter().getInstance();
    return expressApp;
}

// Export the Vercel serverless handler
export default async function handler(req: any, res: any) {
    if (!server) {
        const expressApp = await bootstrap();
        server = serverlessExpress({ app: expressApp });
    }
    return server(req, res);
}
