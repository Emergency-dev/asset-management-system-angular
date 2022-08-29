import { Component, OnInit } from '@angular/core';
import { CartItemInfo } from 'src/app/models/transaction-info.model';
import { PointOfSaleTransaction } from '../../../services/point-of-sale-transaction.service';
import { CartItemAddService } from './services/casrt-item-add.service';

@Component({
  selector: 'app-cart-item-add',
  templateUrl: './cart-item-add.component.html',
  styleUrls: ['./cart-item-add.component.css'],
  providers: [CartItemAddService]
})
export class CartItemAddComponent implements OnInit {
  showPopover:boolean = false;
  cartItemInfo: CartItemInfo = new CartItemInfo();
  
  constructor(protected cartItemService: CartItemAddService,
    protected transactionService: PointOfSaleTransaction) { }

  ngOnInit(): void {
  }

  togglePopover(){
    this.showPopover = !this.showPopover;
  }

  onUnitChange(target:any){
    this.cartItemInfo.unit = target.value;
  }

  onAddClick(){
    this.transactionService.transactionInfo.cartItemList.push(this.cartItemInfo);
  }
}
