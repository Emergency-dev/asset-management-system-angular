import { Component, OnInit } from '@angular/core';
import { CartItemInfo } from 'src/app/models/transaction-info.model';
import { ProductInfo } from 'src/app/models/product-info.model';
import { CartItemAddService } from './services/casrt-item-add.service';
import {DataService} from 'src/app/services/supabase.service'
import { VirtualTimeScheduler } from 'rxjs';
import { PosTransactionService } from '../../../services/pos-transaction.service';

@Component({
  selector: 'app-cart-item-add',
  templateUrl: './cart-item-add.component.html',
  styleUrls: ['./cart-item-add.component.css'],
  providers: [CartItemAddService, DataService]
})
export class CartItemAddComponent implements OnInit {
  showPopover:boolean = false;
  cartItemInfo: CartItemInfo = new CartItemInfo();
  productInfo: ProductInfo[] = [];
  selectedProductInfo: ProductInfo = new ProductInfo();
  localCartItemInfo: CartItemInfo = new CartItemInfo();
  
  constructor(protected cartItemService: CartItemAddService,
    protected transactionService: PosTransactionService,
    protected dataService: DataService ) { 
      this.getDataServiceData();
    }

  ngOnInit(): void {
    // this.getDataServiceData();
  }

  togglePopover(){
    this.showPopover = !this.showPopover;
  }

  onUnitChange(target:any){
    this.cartItemInfo.unit = target.value;
  }

  onAddClick(){
    let veryLocalCartItemInfo: CartItemInfo = new CartItemInfo();
    veryLocalCartItemInfo.price = this.cartItemInfo.price;
    veryLocalCartItemInfo.productInfo.productCode = this.cartItemInfo.productInfo.productCode;
    veryLocalCartItemInfo.productInfo.productName = this.cartItemInfo.productInfo.productName;
    veryLocalCartItemInfo.productInfo.productUnit = this.cartItemInfo.productInfo.productUnit;
    veryLocalCartItemInfo.quantity = this.cartItemInfo.quantity;
    veryLocalCartItemInfo.totalPrice = this.cartItemInfo.totalPrice;
    veryLocalCartItemInfo.unit = this.cartItemInfo.unit;
    // console.log(this.cartItemInfo);
    // console.log(veryLocalCartItemInfo);
    this.transactionService.transactionInfo.cartItemList.push(veryLocalCartItemInfo);
  }
  
  getSelectedProductInfo(){
    this.productInfo.forEach((value) => {
      if(value.productCode == this.cartItemInfo.productInfo.productCode){
        this.selectedProductInfo.productCode = value.productCode;
        this.cartItemInfo.productInfo.productCode = value.productCode;
        this.selectedProductInfo.productName = value.productName;
        this.cartItemInfo.productInfo.productName = value.productName;
        this.selectedProductInfo.price = value.price;
        this.cartItemInfo.unit = value.productUnit;
        this.cartItemInfo.price = value.price;
        this.selectedProductInfo.minPrice = value.minPrice;
        this.cartItemInfo.totalPrice = value.price*this.cartItemInfo.quantity;

        //this.customerService.selectedProductInfo = this.selectedProductInfo;
        //this.transactionService.transactionInfo.selectedProductInfo = this.selectedProductInfo;
      }
    }); 

  }
  async getDataServiceData(){
    const proInfo: Array<ProductInfo> = [];
    const options = await (await this.dataService.getProducts()).data;
    options?.map((item)=>{
      let proInfo  = new ProductInfo ();
      proInfo =({
        productId: item.ProductId,
        productCode: item.ProductCode,
        productName: item.ProductName,
        productImageUrl: '',
        productUnit: item.MeasureUnit,
        price: item.SaleRate,
        minPrice: item.MinRate,
        maxPrice: 0,
      })
      this.productInfo.push(proInfo);
    });
    // console.log('this.productInfo - Add Cart Component');
    // console.log(this.productInfo);
    // console.log('options - Add Cart Component');
    // console.log(options);
    
  }
}
