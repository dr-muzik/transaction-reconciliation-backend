import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReconciliationModule } from './reconciliation/reconciliation.module';

@Module({
  imports: [ReconciliationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
