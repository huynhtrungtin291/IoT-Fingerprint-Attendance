import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';

declare global {
  interface ImportMeta {
    webpackHot?: {
      data?: { closePromise?: Promise<void> };
      accept(): void;
      dispose(callback: (data: { closePromise?: Promise<void> }) => void): void;
    };
  }
}

async function bootstrap() {
  const hot = import.meta.webpackHot;
  if (hot?.data?.closePromise) {
    await hot.data.closePromise;
  }
  const cookieSecret = process.env.COOKIE_SECRET;
  
  if (!cookieSecret) {
    throw new Error('COOKIE_SECRET must be configured to sign cookies');
  }

  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: !!hot,
    cookies: {
      secret: cookieSecret,
    },
  });
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(cookieParser(cookieSecret));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);

  if (hot) {
    hot.accept();

    hot.dispose((data) => {
      data.closePromise = app.close();
    });
  }
}

void bootstrap();
