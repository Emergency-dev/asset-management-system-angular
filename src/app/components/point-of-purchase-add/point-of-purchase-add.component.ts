import { Component, OnInit } from '@angular/core';
import { PointOfSaleTransaction } from '../point-of-sale-add/services/point-of-sale-transaction.service';

@Component({
  selector: 'app-point-of-purchase-add',
  templateUrl: './point-of-purchase-add.component.html',
  styleUrls: ['./point-of-purchase-add.component.css']
})
export class PointOfPurchaseAddComponent implements OnInit {

  steps = [
    { stepId: 1, stepTitle: 'Fill Cart' },
    { stepId: 2, stepTitle: 'Review'}];
    currentStep: number = 1;
    constructor() {}
  
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
