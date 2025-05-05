import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:
      'http://localhost:5173, https://transaction-reconciliation-frontend.onrender.com, https://report-discrepancies.vercel.app', // allow your frontend
    methods: 'GET,POST',
    // credentials: true, // only if you're using cookies/auth
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
