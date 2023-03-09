import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prismaService';

@Injectable()
export class transactionService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService) { }
  // Save data in the database model Conversor
  public async CreateConversor(data: Prisma.ConversorCreateInput) {
    const transaction = await this.prisma.conversor.create({
      data,
    });
    return transaction;
  }
  // Save data in the database model transaction
  public async CreateTransaction(data: Prisma.TransactionCreateInput) {
    const transaction = await this.prisma.transaction.create({
      data,
    });
    return transaction;
  }
  // find every transaction of one user in the transaction
  public async ListTransactions(IdUser: string) {
    const transaction = await this.prisma.transaction.findMany({
      where: { UserId: IdUser },
    });
    return transaction;
  }
  // delete One transaction in the database in the model transaction
  public async deleteOneTransaction(id: string) {
    const transaction = await this.prisma.transaction.delete({
      where: {
        TransactionId: id,
      },
    });

    return transaction;
  }
  // find a transaction in the model transaction
  public async FindTransaction(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        TransactionId: id,
      },
    });

    return transaction;
  }
}
