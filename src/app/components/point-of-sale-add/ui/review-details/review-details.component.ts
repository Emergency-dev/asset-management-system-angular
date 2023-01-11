import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerInfoService } from 'src/app/components/point-of-sale-add/ui/customer-details/services/customer-details.service';
import { CartItemAddService } from 'src/app/components/point-of-sale-add/ui/cart-item-list/cart-item-add/services/casrt-item-add.service';
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { CartItemInfo } from 'src/app/models/transaction-info.model';
import { PosTransactionService } from '../../services/pos-transaction.service';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css'],
  providers: [CartItemAddService,
              CustomerInfoService]
})
export class ReviewDetailsComponent implements OnInit {
  customerInfo = new CustomerInfo();
  cartItemInfo: CartItemInfo = new CartItemInfo();
  cartItems: CartItemInfo[] = [];
  @ViewChild("tBill") tBill: ElementRef<HTMLElement> = {} as ElementRef;
  price:number = 0;

  reviewList:{productCode:string,productName:string,quantity:number,unit:string,perUnitPrice:number,totalPrice:number,customerName:string,customerPhone:string}[] = [];
  constructor(protected cartItemService: CartItemAddService,
    protected customerService: CustomerInfoService,
    protected transactionService: PosTransactionService) {
      this.loadTotalPrice();
     }

  ngOnInit(): void {
    this.getDataFromTransactionService();
  }

  loadTotalPrice(){
    this.transactionService.transactionInfo.cartItemList.forEach((value) => {
      this.price += value.quantity * value.price;
    })
  }

  getDataFromTransactionService(){
    this.customerInfo = this.transactionService.transactionInfo.customerInfo;
    this.cartItemInfo = this.cartItemService.cartItemInfo;
    this.cartItems = this.transactionService.transactionInfo.cartItemList;

    this.cartItems.forEach(item => {
      this.price = item.totalPrice;
      this.reviewList.push({productCode:item.productInfo.productCode,productName:item.productInfo.productName,quantity:(item.cartonQuantity*item.productInfo.packing + item.quantity),unit:item.unit,perUnitPrice:item.price,totalPrice:(item.cartonQuantity*item.productInfo.packing + item.quantity) * item.price,customerName:this.customerInfo.name,customerPhone:this.customerInfo.contactNumber});
    });
  }

  ReviewDetails(e:any){
    this.price=e;
  }

}
