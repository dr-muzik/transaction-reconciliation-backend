import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  interface CorsOriginCallback {
    (err: Error | null, allow?: boolean): void;
  }

  const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: CorsOriginCallback) => {
      const allowedOrigins: string[] = [
        'http://localhost:5173',
        'https://transaction-reconciliation-frontend.onrender.com',
        'https://report-discrepancies.vercel.app',
      ];

      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST',
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
