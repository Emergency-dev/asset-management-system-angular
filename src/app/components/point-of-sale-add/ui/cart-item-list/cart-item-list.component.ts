import { Component, OnInit } from '@angular/core';
import { ProductInfo } from 'src/app/models/product-info.model';
import { CartItemInfo } from 'src/app/models/transaction-info.model';
import { PointOfSaleTransaction } from '../../services/point-of-sale-transaction.service';

@Component({
  selector: 'app-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.css']
})
export class CartItemListComponent implements OnInit {
  cartItems: CartItemInfo[] = [];
  isAddModalOpen = false;

  constructor(protected transactionService: PointOfSaleTransaction) { }

  ngOnInit(): void {
    this.cartItems = this.transactionService.transactionInfo.cartItemList;
  }

  onAddClick(){
    this.isAddModalOpen = true;
  }

  onClose(){
    this.isAddModalOpen = false;
  }

}
