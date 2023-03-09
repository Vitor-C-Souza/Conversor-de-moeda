import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTransactionDTO } from './dto/CreateTransactio.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { transacaoRepository } from './transaction.repository';
import { v4 as uuid } from 'uuid';
import { transactionEntity } from './transaction.entity';
import axios from 'axios';

@Controller('/transacao')
export class transactionController {
  // eslint-disable-next-line prettier/prettier
  constructor(private transacaoRepository: transacaoRepository) { }

  @Post() // Post method that receives the Body data in the request
  async CreateTransaction(@Body() DataReceived: CreateTransactionDTO) {
    //Código executado se usar a rota Post da api onde salvara os dados do Body em algum lugar como o sqlite usado neste projeto
    const TransacaoEntity: transactionEntity = new transactionEntity();

    TransacaoEntity.UserId = uuid();
    TransacaoEntity.currencyOrigin = DataReceived.currencyOrigin;
    TransacaoEntity.currencyDestiny = DataReceived.currencyDestiny;
    TransacaoEntity.valueOrigin = DataReceived.valueOrigin;
    // api publica sendo consumida com a biblioteca axios que foi instalada com "npm install axios" entrando com os dados currencyOrigin, currencyDestiny e valueOrigin para ter o retorno do value Destiny TXConversor
    const TransacaoAPI = await axios({
      method: 'get',
      url: `https://api.apilayer.com/exchangerates_data/convert?to=${TransacaoEntity.currencyDestiny}&from=${TransacaoEntity.currencyOrigin}&amount=${TransacaoEntity.valueOrigin}`,
      headers: { apikey: 'wGAiX3ETNfjinlG5taPcYSgRcd6G01sP' },
    }).then(function (response: any) {
      return response.data;
    });
    TransacaoEntity.TXConversor = TransacaoAPI.info.rate;
    TransacaoEntity.DateTimeUTC = new Date(Date.now()); // verifica se foi digitado uma data ou não no body ja que o dado é opcional se não digitar é salvo da data atual da requisição no banco
    if (DataReceived.DateTimeUTC) {
      TransacaoEntity.DateTimeUTC = new Date(DataReceived.DateTimeUTC);
    }
    await this.transacaoRepository.SaveConversor(TransacaoEntity);

    TransacaoEntity.TransactionId = uuid();

    TransacaoEntity.valueDestiny = TransacaoAPI.result;

    await this.transacaoRepository.SaveTransaction(TransacaoEntity);

    return {
      transaction: TransacaoEntity,
      message: 'Transaction created with success!!!',
    };
  }

  @Post('user/:UserId') // Post method that receives the Body data in the request, but receives a parameter
  public async CreateMoreTransactionForUser(
    @Param('UserId') id: string,
    @Body() DataReceived: CreateTransactionDTO,
  ) {
    const UserTransactionMemory = await this.transacaoRepository.toList(id);

    if (UserTransactionMemory.length !== 0) {
      // checking if there is a user with that id in the database
      const TransacaoEntity = new transactionEntity();

      TransacaoEntity.UserId = id;
      TransacaoEntity.currencyOrigin = DataReceived.currencyOrigin;
      TransacaoEntity.currencyDestiny = DataReceived.currencyDestiny;
      TransacaoEntity.valueOrigin = DataReceived.valueOrigin;
      // public api being consumed with the axios library that was installed with "npm install axios" entering the currencyOrigin, currencyDestiny and valueOrigin data to have the value Destiny TXConverter returned
      const TransacaoAPI = await axios({
        method: 'get',
        url: `https://api.apilayer.com/exchangerates_data/convert?to=${TransacaoEntity.currencyDestiny}&from=${TransacaoEntity.currencyOrigin}&amount=${TransacaoEntity.valueOrigin}`,
        headers: { apikey: 'wGAiX3ETNfjinlG5taPcYSgRcd6G01sP' },
      }).then(function (response: any) {
        return response.data;
      });
      TransacaoEntity.TXConversor = TransacaoAPI.info.rate;
      TransacaoEntity.DateTimeUTC = new Date(Date.now()); // checks if a date was typed or not in the body since the data is optional if not typed it is saved from the current date of the request in the database
      if (DataReceived.DateTimeUTC) {
        TransacaoEntity.DateTimeUTC = new Date(DataReceived.DateTimeUTC);
      }

      TransacaoEntity.TransactionId = uuid();
      TransacaoEntity.valueDestiny = TransacaoAPI.result;

      await this.transacaoRepository.SaveTransaction(TransacaoEntity);

      return {
        transaction: TransacaoEntity,
        message: 'Transaction created with success!!!',
      };
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:UserId') // Pulls all transactions for a user from the database
  async GetTransaction(@Param('UserId') id: string) {
    const UserTransactionMemory = await this.transacaoRepository.toList(id);

    if (UserTransactionMemory.length !== 0) {
      // checking if there is a user with that id in the database
      return UserTransactionMemory;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:TransactionId')
  public async DeleteTransaction(@Param('TransactionId') id: string) {
    const TransactionMemory = await this.transacaoRepository.FindTransaction(
      id,
    );

    if (TransactionMemory === null) {
      // checking if a transaction with that id exists in the database
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    } else {
      await this.transacaoRepository.deleteTransaction(id);
      return { message: `Transaction ${id} was deleted` };
    }
  }
}
