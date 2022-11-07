import { Component, OnInit } from '@angular/core';
import { PosTransactionService } from 'src/app/components/point-of-sale-add/services/pos-transaction.service';

@Component({
  selector: 'app-purchase-cart',
  templateUrl: './purchase-cart.component.html',
  styleUrls: ['./purchase-cart.component.css'],
  providers: []
})
export class PurchaseCartComponent implements OnInit {

  constructor(protected transactionService: PosTransactionService) { }

  ngOnInit(): void {
  }

}
