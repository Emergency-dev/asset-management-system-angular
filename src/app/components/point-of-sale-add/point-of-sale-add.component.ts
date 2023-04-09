import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppModule } from 'src/app/app.module';
import { TransactionListService } from '../point-of-sale-table/services/transaction-list.service';
import { PosTransactionService } from './services/pos-transaction.service';
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { TransactionInfo } from 'src/app/models/transaction-info.model';
import { CartItemInfo } from 'src/app/models/transaction-info.model';
import { DataService } from 'src/app/services/supabase.service';
import { CartItemAddService } from './ui/cart-item-list/cart-item-add/services/casrt-item-add.service';

@Component({
  selector: 'app-point-of-sale-add',
  templateUrl: './point-of-sale-add.component.html',
  styleUrls: ['./point-of-sale-add.component.css'],
  providers: [PosTransactionService, TransactionListService, CartItemAddService,DataService]
})
export class PointOfSaleAddComponent implements OnInit {
  customerInfo = new CustomerInfo();
  cartItems: CartItemInfo[] = [];

  // @Output() finishTransaction:EventEmitter<any> = new EventEmitter();
  @Output() finishTransaction:EventEmitter<TransactionInfo> = new EventEmitter();
  
  // steps = [{ stepId: 1, stepTitle: 'Select Customer' },
  // { stepId: 2, stepTitle: 'Add Products in Cart' },
  // { stepId: 3, stepTitle: 'Enter Customer Details' },
  // { stepId: 4, stepTitle: 'Review'}];
  steps = [
  { stepId: 1, stepTitle: 'Fill Cart' },
  { stepId: 2, stepTitle: 'Review'}];
  currentStep: number = 1;
  //reviewList:{productCode:string,productName:string,quantity:number,unit:string,perUnitPrice:number,totalPrice:number,customerName:string,customerPhone:string}[] = [];
  reviewList2:TransactionInfo= new TransactionInfo();  
  totalPrice = 0;
  constructor(protected transactionService: PosTransactionService, protected transactionInfoList1: TransactionListService,protected cartItemService: CartItemAddService,protected dataService:DataService) {}

  ngOnInit(): void {
  }

  onClickBack() {
    this.currentStep--;
  }

  onClickNext() {
    this.currentStep++;
  }

  onClickFinish() {
    this.transactionInfoList1.transactionInfo.push(this.transactionService.transactionInfo);
    //console.log(this.transactionInfoList1);
    // this.reviewList2 = this.transactionInfoList1.transactionInfo;

    //this.finishTransaction.emit("Finish");

    this.customerInfo = this.transactionService.transactionInfo.customerInfo;
    this.cartItems = this.transactionService.transactionInfo.cartItemList;

    // this.cartItems.forEach(item => {
    //   this.serviceReviewList.setReviewList(item.productInfo.productCode,item.productInfo.productName,item.quantity,item.unit,item.price,item.quantity*item.price,this.customerInfo.name,this.customerInfo.contactNumber);
    // });
    // this.cartItems.forEach(item => {
    //   this.reviewList.push({productCode:item.productInfo.productCode,productName:item.productInfo.productName,quantity:item.quantity,unit:item.unit,perUnitPrice:item.price,totalPrice:item.quantity*item.price,customerName:this.customerInfo.name,customerPhone:this.customerInfo.contactNumber});
    // });
    //console.log(this.serviceReviewList.getReviewList());
    //console.log(this.reviewList2);
    console.log(this.reviewList2);
    

    this.reviewList2.customerInfo = this.transactionService.transactionInfo.customerInfo;
    this.reviewList2.cartItemList = this.transactionService.transactionInfo.cartItemList;
    this.reviewList2.transactionDate = new Date();
    
    //this.finishTransaction.emit(this.reviewList);
    let price = 0,products =0;
    this.reviewList2.cartItemList.forEach(element => {
      if(element) price += element.quantity * element.price;
    });
    this.reviewList2.cartItemList.forEach(element => {
      if(element) products += 1;
    });
    this.dataService.addTransactionDetails("User Name",this.reviewList2.customerInfo.name,products,price,this.reviewList2.customerInfo.customerCode.toString());
    this.GetBillID();
    
  }

  getTitle(step:number){
    return this.steps.find(ele => ele.stepId === step)?.stepTitle;
  }

  seeDetails(e:any){
    this.transactionService.transactionInfo.grandTotal = e;
  }
  async GetBillID(){
      //this.reviewList = this.transaction;
      //console.log(this.dataService);
      //console.log(this.serviceReviewList.getReviewList());
      //this.reviewList.push(e) ;
      //const Info: Array<TransactionSupabaseInfo> = [];
      const options = await (await (this.dataService.getTransaction())).data;
      options?.map((item)=>{
        this.transactionService.transactionInfo.transactionId=item.id,
        this.transactionService.transactionInfo.transactionDate=item.Date
        })
      if(options){
        this.EmitFunction();
      }
  }
  EmitFunction (){
    this.reviewList2.cartItemList.forEach(element => {
      this.dataService.addOrderDetails(element.productInfo.productCode,element.quantity,element.cartonQuantity,this.reviewList2.customerInfo.customerCode.toString(),0,this.transactionService.transactionInfo.userInfo.userType,this.transactionService.transactionInfo.userInfo.userId,this.transactionService.transactionInfo.transactionId);
    });
    // this.finishTransaction.emit(this.reviewList2);
    //this.transactionService.PrintTransaction();
    this.finishTransaction.emit(this.transactionService.transactionInfo);
  }
}
