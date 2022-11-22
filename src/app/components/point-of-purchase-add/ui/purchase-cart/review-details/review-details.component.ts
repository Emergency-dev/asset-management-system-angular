import { Component, OnInit } from '@angular/core';
import { CustomerInfoService } from 'src/app/components/point-of-sale-add/ui/customer-details/services/customer-details.service';
import { CartItemAddService } from 'src/app/components/point-of-sale-add/ui/cart-item-list/cart-item-add/services/casrt-item-add.service';
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { CartItemInfo } from 'src/app/models/transaction-info.model';
import { PopTransactionService } from '../../../service/pop-transaction.service';

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
  constructor(protected cartItemService: CartItemAddService,
    protected customerService: CustomerInfoService,
    protected transactionService: PopTransactionService) { }

  ngOnInit(): void {
    this.getDataFromTransactionService();
  }

  getDataFromTransactionService(){
    this.customerInfo = this.transactionService.transactionInfo.customerInfo;
    this.cartItemInfo = this.cartItemService.cartItemInfo;
    this.cartItems = this.transactionService.transactionInfo.cartItemList;
    console.log('this.cartItems');
    console.log(this.cartItems);
    console.log(this.customerInfo);
    console.log(this.transactionService);
  }

}
