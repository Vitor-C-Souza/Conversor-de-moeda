import { Injectable } from '@nestjs/common';
import { transactionService } from './transaction.service';

@Injectable()
export class transacaoRepository {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly TransactionService: transactionService) { }
  // comunication between controllers and services
  public async SaveConversor(transaction): Promise<void> {
    await this.TransactionService.CreateConversor(transaction);
  }

  public async SaveTransaction(transaction) {
    await this.TransactionService.CreateTransaction(transaction);
  }

  public async toList(id: string) {
    const transactionByOneUser = await this.TransactionService.ListTransactions(
      id,
    );

    return transactionByOneUser;
  }

  public async deleteTransaction(id: string) {
    await this.TransactionService.deleteOneTransaction(id);
  }

  public async FindTransaction(id: string) {
    const transactionEncountered =
      await this.TransactionService.FindTransaction(id);

    return transactionEncountered;
  }
}
