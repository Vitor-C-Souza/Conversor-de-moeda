import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prismaService.js';
import { transactionController } from './Transaction.controller.js';
import { transacaoRepository } from './transaction.repository.js';
import { transactionService } from './transaction.service.js';

@Module({
  controllers: [transactionController],
  providers: [transacaoRepository, PrismaService, transactionService],
})
export class transacaoModule { }
