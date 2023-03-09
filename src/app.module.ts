import { Module } from '@nestjs/common';
import { transacaoModule } from './transaction/transaction.module.js';

@Module({
  imports: [transacaoModule],
})
export class AppModule {}
