import { Injectable } from '@angular/core';
import { TransactionInfo } from 'src/app/models/transaction-info.model';

@Injectable({
  providedIn: 'root'
})
export class PopTransactionService {
  transactionInfo:TransactionInfo = new TransactionInfo();

  constructor() { }
}
