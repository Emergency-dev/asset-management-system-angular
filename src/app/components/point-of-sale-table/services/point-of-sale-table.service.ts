import { BehaviorSubject, Observable } from "rxjs";
import { Customer } from "src/app/models/customer-type.enum";
import { TransactionInfo } from "src/app/models/transaction-info.model";

export class PointOfSaleTransactionHistory{
    transactionHistoryList:TransactionInfo[] = [];
    private historyInfo: BehaviorSubject<TransactionInfo[]>;

    constructor(){
        
        for(let i = 0; i < 100 ; i++){
        let transactionInfo = new TransactionInfo();
        transactionInfo.transactionId = (new Date()).getMilliseconds() + '' + Math.round(Math.random() * 100);
        transactionInfo.transactionDate = this.addDays(new Date(), Math.round(Math.random() * 90));
        transactionInfo.userInfo.firstName = 'Asad';
        transactionInfo.userInfo.lastName = 'Asad';
        transactionInfo.customerInfo.name = 'Asset Manager';
        transactionInfo.customerInfo.customerType = Math.round(Math.random() * 2);

        this.transactionHistoryList.push(transactionInfo);
        }

        

        this.historyInfo = new BehaviorSubject<TransactionInfo[]>(this.transactionHistoryList);

        //this.addTransaction();
    }

    addTransaction(){
        setTimeout(() => {
            let transactionInfo = new TransactionInfo();
        transactionInfo.transactionId = (new Date()).getMilliseconds() + '' + Math.round(Math.random() * 100);
        transactionInfo.transactionDate = this.addDays(new Date(), Math.round(Math.random() * 30));
        transactionInfo.userInfo.firstName = 'Asad';
        transactionInfo.userInfo.lastName = 'Asad';
        transactionInfo.customerInfo.name = 'Asset Manager';
        transactionInfo.customerInfo.customerType = Customer.Regular;

        this.transactionHistoryList.push(transactionInfo);
        this.historyInfo.next(this.transactionHistoryList);
        this.addTransaction();
        }, 2000);
        
    }

    addDays(oldDate: Date, days: number) {
        return new Date(oldDate.getFullYear(),oldDate.getMonth(),oldDate.getDate()-days);
      }

      getValue(): Observable<TransactionInfo[]> {
        return this.historyInfo.asObservable();
      }
}