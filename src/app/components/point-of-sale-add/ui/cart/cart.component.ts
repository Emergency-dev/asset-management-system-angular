import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItemInfo } from 'src/app/models/transaction-info.model';
import { ProductInfo } from 'src/app/models/product-info.model';
import { DataService } from 'src/app/services/supabase.service'
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { CustomerInfoService } from 'src/app/components/point-of-sale-add/ui/customer-details/services/customer-details.service';
import { PosTransactionService } from '../../services/pos-transaction.service';
import { TransactionListService } from 'src/app/components/point-of-sale-table/services/transaction-list.service';
import { TotalPrice } from './TotalPrice.model';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DataService, CustomerInfoService]
})
export class CartComponent implements OnInit {
  isExtraNumberModalOpen:boolean = false;
  @ViewChild("pListName") pListName: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("pName") pName: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("pId") pId: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("tBill") tBill: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cList") cLsit: ElementRef<HTMLInputElement> = {} as ElementRef;
  cartItems: CartItemInfo[] = [];
  searchFilter: BehaviorSubject<{
    searchQuery: string,
    startDate: Date, endDate: Date
  }>;
  searchQuery: string = "";
  startDate: Date = new Date();
  endDate: Date = new Date();
  listCustomer: CustomerInfo[] = [];
  customerInfo: CustomerInfo = new CustomerInfo();
  cartItemInfo: CartItemInfo = new CartItemInfo();
  productInfo: ProductInfo[] = [];
  selectedProductInfo: ProductInfo = new ProductInfo();
  customerInfo1: CustomerInfo[] = [];
  productExists: boolean = false;
  isProductCodeInDB: boolean = false;
  isProductNameInDB: boolean = false;
  selectedCustomerInfo: CustomerInfo = new CustomerInfo();
  checkedTransactions: string[] = [];
  totalBill: number = 0;
  productName: string[] = [];
  customerName: string[] = [];
  price: TotalPrice = new TotalPrice();
  //totalBill: Observable<number[]>();

  isAddCustomerModalOpen = false;

  constructor(protected transactionService: PosTransactionService, protected dataService: DataService,
    protected customerService: CustomerInfoService, protected transactionInfoList1: TransactionListService , protected dialogRef:MatDialog ) {
    // this.startDate = this.posTransactionHistoryService.addDays(this.startDate, 30);
    this.searchFilter = new BehaviorSubject({ searchQuery: this.searchQuery, startDate: this.startDate, endDate: this.endDate });
    this.getDataServiceData();
    this.getCustomersData();
    console.log(this.transactionService);

  }

  ngOnInit(): void {
    //this.listCustomer = this.customerService.customerInfoList;
  }

  onExtraNumberClick(){
    this.isExtraNumberModalOpen = true;
    //this.dialogRef.open(ExtraNumberComponent);
  }
  onExtraNumberClose(){
    this.isExtraNumberModalOpen = false;
  }
  onAddClick() {
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

  getSelectedProductInfo() {
    if (this.productAlreadyInTheCart()) {
      alert("Product already exists in the cart");
      this.ClearProduct();
      this.pId.nativeElement.value = "";
      this.pName.nativeElement.value = "";
      this.pId.nativeElement.focus();
    }
    else {
      if (this.productCodeNotInTheDatabase()) {
        this.onAddClick();
        this.pId.nativeElement.value = "";
        this.pName.nativeElement.value = "";
        this.pId.nativeElement.focus();
      }
      else if (this.productNameNotInTheDatabase()) {
        this.onAddClick();
        this.pId.nativeElement.value = "";
        this.pName.nativeElement.value = "";
        this.pId.nativeElement.focus();
      }
      else {
        alert("Product code not in the database");
        this.pId.nativeElement.value = "";
        this.pName.nativeElement.value = "";
        this.pId.nativeElement.focus();
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
  async getDataServiceData() {
    const proInfo: Array<ProductInfo> = [];
    const options = await (await this.dataService.getProducts()).data;
    options?.map((item) => {
      let proInfo = new ProductInfo();
      proInfo = ({
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

  async getCustomersData() {
    const cusInfo: Array<CustomerInfo> = [];
    const cusOptions = await (await this.dataService.getCustomers()).data;
    cusOptions?.map((item) => {
      let cusInfo = new CustomerInfo();
      cusInfo = ({
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

  productAlreadyInTheCart(): boolean {
    this.productExists = false;
    this.transactionService.transactionInfo.cartItemList.forEach((value) => {
      // if(value.productInfo.productCode == this.cartItemInfo.productInfo.productCode){
      //   this.productExists = true;
      // }
      if (value.productInfo.productCode == this.pId.nativeElement.value) {
        this.productExists = true;
      }
      else if(value.productInfo.productName == this.pListName.nativeElement.value){
        this.productExists = true;
      }
    });
    return this.productExists;
  }

  productCodeNotInTheDatabase(): boolean {
    this.isProductCodeInDB = false;
    this.productInfo.forEach((value) => {
      // if(value.productCode == this.cartItemInfo.productInfo.productCode){
      //   this.isProductCodeInDB = true;
      //   this.addProductInTheCart(value);
      //   //@ViewChild(value.productCode) quantity : ElementRef<HTMLInputElement> = {} as ElementRef;
      // }
      if (value.productCode == this.pId.nativeElement.value) {
        this.isProductCodeInDB = true;
        this.addProductInTheCart(value);
      }
    });
    return this.isProductCodeInDB;
  }

  productNameNotInTheDatabase(): boolean {
    this.isProductNameInDB = false;
    this.productInfo.forEach((value) => {
      if (value.productName == this.cartItemInfo.productInfo.productName) {
        this.isProductNameInDB = true;
        this.addProductInTheCart(value);
      }
    });
    return this.isProductNameInDB;
  }

  searchProductNameInTheDatabase(e: any): boolean {
    this.isProductNameInDB = false;
    this.productInfo.forEach((value) => {
      //console.log(e.target.value.toUpperCase());
      //console.log(value.productName);
      if (value.productName.includes(e.target.value.toUpperCase())) {
        this.isProductNameInDB = true;
        this.productName.push(value.productName);
      }
    });
    this.pListName.nativeElement.focus();
    console.log(this.productName);
    return this.isProductNameInDB;
  }

  searchCustomerNameInTheDatabase(e: any) {
    this.listCustomer.forEach((value) => {
      if (value.name.includes(e.target.value.toUpperCase())) {
        this.customerName.push(value.name);
      }
    });
    console.log(this.customerName);
  }

  ClearProduct() {
    this.productName = [];
  }

  ClearCustomer() {
    this.customerName = [];
  }

  addProductInTheCart(value: any) {
    this.selectedProductInfo.productCode = value.productCode;
    this.cartItemInfo.productInfo.productCode = value.productCode;
    this.selectedProductInfo.productName = value.productName;
    this.cartItemInfo.productInfo.productName = value.productName;
    this.selectedProductInfo.price = value.price;
    this.cartItemInfo.unit = value.productUnit;
    this.cartItemInfo.price = value.price;
    this.selectedProductInfo.minPrice = value.minPrice;
    this.cartItemInfo.totalPrice = value.price * this.cartItemInfo.quantity;
    this.ClearProduct();
    //this.cartItemInfo.productInfo.productCode = "";
  }

  checkBoxChecked(event: any) {
    if (event.target.checked) {
      this.checkedTransactions.push(event.target.id);
    } else {
      const index = this.checkedTransactions.indexOf(event.target.id, 0);
      this.checkedTransactions.splice(index, 1);
    }
    console.log(this.checkedTransactions);
  }

  removeTransactions() {
    if (this.checkedTransactions.length != 0) {
      this.transactionService.transactionInfo.cartItemList.forEach((valuee, index) => {
        this.checkedTransactions.forEach((value) => {
          if (value == valuee.productInfo.productCode) {
            this.transactionService.transactionInfo.cartItemList.splice(index, 1);
            this.totalBill -= valuee.productInfo.price;
          }
        });
      });
    }
    else
      alert("No item selected");
  }

  getCustomerdetails(e: any) {
    this.listCustomer.forEach((value) => {
      // if(value.customerCode == this.customerInfo.customerCode){
      //   this.customerInfo.name = value.name;
      //   this.customerInfo.OrganizationCode = value.OrganizationCode;
      //   this.customerInfo.contactNumber = value.contactNumber;
      //   this.customerInfo.OrganizationName = value.OrganizationName;

      //   this.customerService.customerInfo = this.customerInfo;
      //   this.transactionService.transactionInfo.customerInfo = this.customerInfo;
      // }
      if (value.name == e.target.value) {
        this.customerInfo.name = value.name;
        this.customerInfo.OrganizationCode = value.OrganizationCode;
        this.customerInfo.contactNumber = value.contactNumber;
        this.customerInfo.OrganizationName = value.OrganizationName;
        this.customerInfo.customerCode = value.customerCode;

        this.customerService.customerInfo = this.customerInfo;
        this.transactionService.transactionInfo.customerInfo = this.customerInfo;
      }
      console.log(this.customerInfo);
    });
    //console.log(this.transactionService.transactionInfo.customerInfo); 
  }

  updateTotalPrice() {
    console.log("Total Bill");
    this.transactionService.transactionInfo.cartItemList.forEach((value) => {
      this.price.totalAmount += value.quantity * value.price;
    })
    this.tBill.nativeElement.innerHTML = "Total Bill : " + this.price.totalAmount;
    console.log(this.price.totalAmount);
    this.pId.nativeElement.focus();
  }

  ClearTotalPrice() {
    this.price.totalAmount = 0;
  }

  ToggleAddCustomerModal(){
    this.isAddCustomerModalOpen = !this.isAddCustomerModalOpen;
  }
}
