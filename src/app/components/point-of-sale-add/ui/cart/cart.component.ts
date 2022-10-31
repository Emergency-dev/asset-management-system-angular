import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItemInfo } from 'src/app/models/transaction-info.model';
import { ProductInfo } from 'src/app/models/product-info.model';
import {DataService} from 'src/app/services/supabase.service'
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { PointOfSaleTransactionHistory } from 'src/app/components/point-of-sale-table/services/point-of-sale-table.service';
import { PointOfSaleTransaction } from 'src/app/components/point-of-sale-add/services/point-of-sale-transaction.service';
import { CustomerInfoService } from 'src/app/components/point-of-sale-add/ui/customer-details/services/customer-details.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [PointOfSaleTransactionHistory, DataService, PointOfSaleTransaction, CustomerInfoService]
})
export class CartComponent implements OnInit {
  cartItems: CartItemInfo[] = [];
  searchFilter:BehaviorSubject<{searchQuery:string,
    startDate:Date, endDate:Date}>;
  searchQuery:string = "";
  startDate:Date = new Date();
  endDate:Date = new Date();
  listCustomer:CustomerInfo[]=[];
  customerInfo: CustomerInfo=new CustomerInfo();
  cartItemInfo: CartItemInfo = new CartItemInfo();
  productInfo: ProductInfo[] = [];
  selectedProductInfo: ProductInfo = new ProductInfo();

  constructor(protected transactionService: PointOfSaleTransaction, protected posTransactionHistoryService: PointOfSaleTransactionHistory, protected dataService: DataService, 
    protected pointOfSaleTransaction: PointOfSaleTransaction, protected customerService: CustomerInfoService) {
    this.startDate = this.posTransactionHistoryService.addDays(this.startDate, 30);
    this.searchFilter = new BehaviorSubject({searchQuery:this.searchQuery, startDate: this.startDate, endDate: this.endDate});
    this.getDataServiceData();
    
  }

  ngOnInit(): void {
    this.listCustomer = this.customerService.customerInfoList;
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
    console.log("CALLED");
    console.log(this.cartItemInfo);
    console.log(veryLocalCartItemInfo);
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
  

  getCustomerdetails(){
    this.listCustomer.forEach((value) => {
      if(value.customerCode == this.customerInfo.customerCode){
        this.customerInfo.name = value.name;
        this.customerInfo.OrganizationCode = value.OrganizationCode;
        this.customerInfo.contactNumber = value.contactNumber;
        this.customerInfo.OrganizationName = value.OrganizationName;

        this.customerService.customerInfo = this.customerInfo;
        this.transactionService.transactionInfo.customerInfo = this.customerInfo;
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
    console.log('this.productInfo - Add Cart Component');
    console.log(this.productInfo);
    console.log('options - Add Cart Component');
    console.log(options);
    
  }

}
