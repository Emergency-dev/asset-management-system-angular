import { Component, OnInit } from '@angular/core';
import { PointOfSaleTransaction } from 'src/app/components/point-of-sale-add/services/point-of-sale-transaction.service';

@Component({
  selector: 'app-purchase-cart',
  templateUrl: './purchase-cart.component.html',
  styleUrls: ['./purchase-cart.component.css'],
  providers: [PointOfSaleTransaction]
})
export class PurchaseCartComponent implements OnInit {

  constructor(protected transactionService: PointOfSaleTransaction) { }

  ngOnInit(): void {
  }

}
