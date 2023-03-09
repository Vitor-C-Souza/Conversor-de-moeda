import {
  IsCurrency,
  IsDateString,
  IsOptional,
  IsString,
  NotEquals,
} from 'class-validator';

export class CreateTransactionDTO {
  //Validate date input
  @IsString()
  @NotEquals('')
  currencyOrigin: string;

  @IsCurrency()
  valueOrigin: string;

  @IsString()
  @NotEquals('')
  currencyDestiny: string;

  @IsDateString()
  @IsOptional()
  DateTimeUTC: Date;
}
