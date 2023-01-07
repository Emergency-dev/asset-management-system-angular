import { Component, OnInit } from '@angular/core';
import { CustomerInfoService } from 'src/app/components/point-of-sale-add/ui/customer-details/services/customer-details.service';
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { ProductInfo } from 'src/app/models/product-info.model';
import { CartItemInfo } from 'src/app/models/transaction-info.model';
import { DataService } from 'src/app/services/supabase.service';
import { PopTransactionService } from '../../service/pop-transaction.service';

@Component({
  selector: 'app-purchase-cart',
  templateUrl: './purchase-cart.component.html',
  styleUrls: ['./purchase-cart.component.css'],
  providers: []
})
export class PurchaseCartComponent implements OnInit {
  
  cartItems: CartItemInfo[] = [];
  listCustomer:CustomerInfo[]=[];
  customerInfo: CustomerInfo=new CustomerInfo();
  cartItemInfo: CartItemInfo = new CartItemInfo();
  productInfo: ProductInfo[] = [];
  selectedProductInfo: ProductInfo = new ProductInfo();
  customerInfo1: CustomerInfo[] = [];
  productExists: boolean = false;
  isProductCodeInDB: boolean = false;
  selectedCustomerInfo: CustomerInfo = new CustomerInfo();
  constructor(protected transactionService: PopTransactionService, protected dataService: DataService) {
    this.getDataServiceData();
    this.getCustomersData();
  }

  ngOnInit(): void {
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
    // console.log("CALLED");
    console.log(this.cartItemInfo);
    this.transactionService.transactionInfo.cartItemList.push(veryLocalCartItemInfo);
    console.log(this.transactionService);
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
  

  getCustomerdetails(){
    this.listCustomer.forEach((value) => {
      if(value.customerCode == this.customerInfo.customerCode){
        this.customerInfo.name = value.name;
        this.customerInfo.OrganizationCode = value.OrganizationCode;
        this.customerInfo.contactNumber = value.contactNumber;
        this.customerInfo.OrganizationName = value.OrganizationName;

        //this.customerService.customerInfo = this.customerInfo;
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
        packing:item.Packing,
        urduName:item.urduName
      })
      this.productInfo.push(proInfo);
    });
    console.log('this.productInfo - Add Cart Component');
    console.log(this.productInfo);
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
      this.customerInfo1.push(cusInfo);
    });
    console.log('this.customerInfo1 - Add Cart Component');
    console.log(this.customerInfo1);
    console.log('cusOptions - Add Cart Component');
    console.log(cusOptions);
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

}
