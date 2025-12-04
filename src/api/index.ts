import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Use a variable to cache the server instance between cold starts
let cachedServer: any;

async function createExpressApp(expressApp: express.Express): Promise<any> {
    // Create Nest app using the Express adapter
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressApp),
    );

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

    // Initialize the app before returning the raw Express app
    await app.init();
    return expressApp;
}

// Export the Vercel serverless handler function
export default async function handler(req: any, res: any) {
    if (!cachedServer) {
        // 1. Create a new Express instance
        const expressApp = express();

        // 2. Wrap the Nest application around the Express instance
        await createExpressApp(expressApp);

        // 3. Cache the Express instance for subsequent requests
        cachedServer = expressApp;
    }

    // 4. Handle the request using the cached Express app
    cachedServer(req, res);
}
