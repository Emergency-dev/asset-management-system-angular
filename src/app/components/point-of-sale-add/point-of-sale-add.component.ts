import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { TransactionListService } from '../point-of-sale-table/services/transaction-list.service';
import { PosTransactionService } from './services/pos-transaction.service';

@Component({
  selector: 'app-point-of-sale-add',
  templateUrl: './point-of-sale-add.component.html',
  styleUrls: ['./point-of-sale-add.component.css'],
  providers: [PosTransactionService, TransactionListService]
})
export class PointOfSaleAddComponent implements OnInit {

  //@Output() finishTransaction:EventEmitter<string> = new EventEmitter();

  // steps = [{ stepId: 1, stepTitle: 'Select Customer' },
  // { stepId: 2, stepTitle: 'Add Products in Cart' },
  // { stepId: 3, stepTitle: 'Enter Customer Details' },
  // { stepId: 4, stepTitle: 'Review'}];
  steps = [
  { stepId: 1, stepTitle: 'Fill Cart' },
  { stepId: 2, stepTitle: 'Review'}];
  currentStep: number = 1;
  constructor(protected transactionService: PosTransactionService, protected transactionInfoList1: TransactionListService) {}

  ngOnInit(): void {
  }

  onClickBack() {
    this.currentStep--;
  }

  onClickNext() {
    this.currentStep++;
  }

  onClickFinish() {
    console.log("Congrats");
    this.transactionInfoList1.transactionInfo.push(this.transactionService.transactionInfo);
    console.log("this.transactionInfoList1");
    console.log(this.transactionInfoList1);
    //this.finishTransaction.emit("Finish");
  }

  getTitle(step:number){
    return this.steps.find(ele => ele.stepId === step)?.stepTitle;
  }
}
