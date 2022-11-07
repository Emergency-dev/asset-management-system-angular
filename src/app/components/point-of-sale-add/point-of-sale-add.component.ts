import { Component, OnInit } from '@angular/core';
import { PosTransactionService } from './services/pos-transaction.service';

@Component({
  selector: 'app-point-of-sale-add',
  templateUrl: './point-of-sale-add.component.html',
  styleUrls: ['./point-of-sale-add.component.css'],
  providers:[]
})
export class PointOfSaleAddComponent implements OnInit {

  // steps = [{ stepId: 1, stepTitle: 'Select Customer' },
  // { stepId: 2, stepTitle: 'Add Products in Cart' },
  // { stepId: 3, stepTitle: 'Enter Customer Details' },
  // { stepId: 4, stepTitle: 'Review'}];
  steps = [
  { stepId: 1, stepTitle: 'Fill Cart' },
  { stepId: 2, stepTitle: 'Review'}];
  currentStep: number = 1;
  constructor(protected transactionService: PosTransactionService) {}

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
  }

  getTitle(step:number){
    return this.steps.find(ele => ele.stepId === step)?.stepTitle;
  }
}
