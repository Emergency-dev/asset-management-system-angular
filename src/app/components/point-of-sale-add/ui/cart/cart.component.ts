import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItemInfo } from 'src/app/models/transaction-info.model';
import { ProductInfo } from 'src/app/models/product-info.model';
import {DataService} from 'src/app/services/supabase.service'
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { CustomerInfoService } from 'src/app/components/point-of-sale-add/ui/customer-details/services/customer-details.service';
import { PosTransactionService } from '../../services/pos-transaction.service';
import { TransactionListService } from 'src/app/components/point-of-sale-table/services/transaction-list.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DataService, CustomerInfoService]
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
  customerInfo1: CustomerInfo[] = [];
  productExists: boolean = false;
  isProductCodeInDB: boolean = false;
  selectedCustomerInfo: CustomerInfo = new CustomerInfo();
  checkedTransactions: string[]=[];
  totalBill: number=0;
  //totalBill: Observable<number[]>();


  constructor(protected transactionService: PosTransactionService, protected dataService: DataService, 
    protected customerService: CustomerInfoService, protected transactionInfoList1: TransactionListService) {
    // this.startDate = this.posTransactionHistoryService.addDays(this.startDate, 30);
    this.searchFilter = new BehaviorSubject({searchQuery:this.searchQuery, startDate: this.startDate, endDate: this.endDate});
    this.getDataServiceData();
    this.getCustomersData();
    console.log(this.transactionService);
    
  }

  ngOnInit(): void {
    //this.listCustomer = this.customerService.customerInfoList;
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

    this.transactionService.transactionInfo.cartItemList.push(veryLocalCartItemInfo);
    this.totalBill += veryLocalCartItemInfo.totalPrice;
  }
  
  getSelectedProductInfo(){
    if(this.productAlreadyInTheCart()){
      alert("Product already exists in the cart");
    }
    else{
      if(this.productCodeNotInTheDatabase()){
        this.onAddClick();
      }
      else{
        alert("Product code not in the database");
      }
    }
  }
  

  // getCustomerdetails(){
  //   this.listCustomer.forEach((value) => {
  //     if(value.customerCode == this.customerInfo.customerCode){
  //       this.customerInfo.name = value.name;
  //       this.customerInfo.OrganizationCode = value.OrganizationCode;
  //       this.customerInfo.contactNumber = value.contactNumber;
  //       this.customerInfo.OrganizationName = value.OrganizationName;

  //       this.customerService.customerInfo = this.customerInfo;
  //       this.transactionService.transactionInfo.customerInfo = this.customerInfo;
  //     }
  //   }); 
  // }
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

  async getCustomersData(){
    const cusInfo: Array<CustomerInfo> = [];
    const cusOptions = await (await this.dataService.getCustomers()).data;
    cusOptions?.map((item)=>{
      let cusInfo  = new CustomerInfo ();
      cusInfo =({
        customerCode: item.CustomerId,
        name: item.CustomerName,
        address: '',
        contactNumber: '',
        customerType: 1,
        OrganizationCode: 0,
        OrganizationName: '',
        
      })
      this.listCustomer.push(cusInfo);
    });
    console.log("this.listCustomer");
    console.log(this.listCustomer);
  }

  productAlreadyInTheCart(): boolean{
    this.productExists = false;
    this.transactionService.transactionInfo.cartItemList.forEach((value)=>{
      if(value.productInfo.productCode == this.cartItemInfo.productInfo.productCode){
        this.productExists = true;
      }
    });
    return this.productExists;
  }

  productCodeNotInTheDatabase(): boolean{
    this.isProductCodeInDB = false;
    this.productInfo.forEach((value) => {
      if(value.productCode == this.cartItemInfo.productInfo.productCode){
        this.isProductCodeInDB = true;
        this.addProductInTheCart(value);
      }
    }); 
    return this.isProductCodeInDB;
  }

  addProductInTheCart(value: any){
    this.selectedProductInfo.productCode = value.productCode;
    this.cartItemInfo.productInfo.productCode = value.productCode;
    this.selectedProductInfo.productName = value.productName;
    this.cartItemInfo.productInfo.productName = value.productName;
    this.selectedProductInfo.price = value.price;
    this.cartItemInfo.unit = value.productUnit;
    this.cartItemInfo.price = value.price;
    this.selectedProductInfo.minPrice = value.minPrice;
    this.cartItemInfo.totalPrice = value.price*this.cartItemInfo.quantity;
  }

  checkBoxChecked(event: any){
    if (event.target.checked) {
      this.checkedTransactions.push(event.target.id);
    } else {
      const index = this.checkedTransactions.indexOf(event.target.id, 0);
      this.checkedTransactions.splice(index,1);
    }
    console.log(this.checkedTransactions);
  }

  removeTransactions(){
    if(this.checkedTransactions.length != 0){
      this.transactionService.transactionInfo.cartItemList.forEach((valuee, index) => {
        this.checkedTransactions.forEach((value) => {
          if(value == valuee.productInfo.productCode){
            this.transactionService.transactionInfo.cartItemList.splice(index,1);
            this.totalBill -= valuee.productInfo.price;
          }
        });
      });
    }
    else
      alert("No item selected");
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
}
