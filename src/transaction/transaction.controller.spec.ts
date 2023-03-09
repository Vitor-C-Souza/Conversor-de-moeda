import { PrismaService } from 'src/database/prismaService';
import { CreateTransactionDTO } from './dto/CreateTransactio.dto';
import { transactionController } from './Transaction.controller';
import { transacaoRepository } from './transaction.repository';
import { transactionService } from './transaction.service';

describe('TransactionController', () => {
    let TransactionController: transactionController;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let TransactionService: transactionService;
    let prisma: PrismaService;
    let TransacaoRepository: transacaoRepository;

    const DataReceived: CreateTransactionDTO = {
        currencyOrigin: 'USD',
        valueOrigin: '7.00',
        currencyDestiny: 'BRL',
        DateTimeUTC: new Date(Date.now()),
    };

    beforeEach(() => {
        TransactionController = new transactionController(TransacaoRepository);
        TransactionService = new transactionService(prisma);
    });
    describe('Route POST in /transacao', () => {
        it('Should create a transaction and an User', async () => {
            const transactionDone = await TransactionController.CreateTransaction(
                DataReceived,
            );
            expect(transactionDone).toBe({
                transaction: transactionDone,
                message: 'Transaction created with success!!!',
            });
        });
    });
});
