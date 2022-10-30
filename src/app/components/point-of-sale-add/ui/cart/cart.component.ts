import { Component, OnInit } from '@angular/core';
import { CartItemInfo } from 'src/app/models/transaction-info.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItemInfo[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
