import { Component, OnInit } from '@angular/core';
import { ProductInfo } from 'src/app/models/product-info.model';
import {DataService} from 'src/app/services/supabase.service'
import { Purchase } from './purchase-info.model';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  productInfo: ProductInfo[] = [];
  isProductNameInDB: boolean = false;
  isProductCodeInDB: boolean = false;
  productName: string [] = [];
  purchase:Purchase= new Purchase();
  saleList:{saleCode:string,saleName:string}[] = [];
  purchaseProductNames:string[] =[];
  saleProductNames:string[] =[];

  constructor(protected dataService: DataService) { 

  }

  ngOnInit(): void {
    this.getDataServiceData();
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
  }

  searchProductCodeInTheDatabase(e:any): boolean{
    this.isProductCodeInDB = false;
    this.productInfo.forEach((value) => {
      if(value.productCode == e.target.value){
        this.isProductCodeInDB = true;
        this.saleList.push({saleCode : value.productCode,saleName:value.productName});
      }
    }); 
    return this.isProductCodeInDB;
  }

  searchProductNameInTheDatabase(e:any) :boolean{
    this.isProductNameInDB = false;
    this.productInfo.forEach((value) => {
      if(value.productName.includes(e.target.value.toUpperCase())){
        this.isProductNameInDB = true;
        this.productName.push(value.productName);
      }
    });
    console.log(this.productName); 
    return this.isProductNameInDB;
  }

  searchPurchaseName(e:any){
    console.log(e.target.value);
    this.isProductNameInDB = false;
    this.productInfo.forEach((value) => {
      if(value.productName.includes(e.target.value.toUpperCase())){
        this.isProductNameInDB = true;
        this.purchaseProductNames.push(value.productName);
      }
    });
    console.log(this.productName); 
    return this.isProductNameInDB;
  }
  purchaseCode(e:any){
    this.isProductCodeInDB = false;
    this.productInfo.forEach((value) => {
      if(value.productCode == e.target.value){
        this.isProductCodeInDB = true;
        this.purchase.purchaseCode = value.productCode;
        this.purchase.purchaseName = value.productName
      }
    });
    this.clearPurchaseList(); 
    return this.isProductCodeInDB;
  }

  purchaseName(e:any){
    console.log(e.target.value);
    this.isProductNameInDB = false;
    this.productInfo.forEach((value) => {
      if(value.productName == e.target.value){
        this.isProductCodeInDB = true;
        this.purchase.purchaseCode = value.productCode;
        this.purchase.purchaseName = value.productName
      }
    }); 
    this.clearPurchaseList();
    return this.isProductCodeInDB;
  }

  searchSaleName(e:any){
    this.isProductNameInDB = false;
    this.productInfo.forEach((value) => {
      if(value.productName.includes(e.target.value.toUpperCase())){
        this.isProductNameInDB = true;
        this.saleProductNames.push(value.productName);
      }
    });
    console.log(this.productName); 
    return this.isProductNameInDB; 
  }
  saleCode(e:any){
    this.isProductCodeInDB = false;
    this.productInfo.forEach((value) => {
      if(value.productCode == e.target.value){
        this.isProductCodeInDB = true;
        this.saleList.push({saleCode : value.productCode,saleName:value.productName});
      }
    });
    this.clearSaleList(); 
    return this.isProductCodeInDB;
  }
  saleName(e:any){
    console.log(e.target.value);
    this.isProductNameInDB = false;
    this.productInfo.forEach((value) => {
      if(value.productName == e.target.value){
        this.isProductNameInDB = true;
        this.saleList.push({saleCode : value.productCode,saleName:value.productName});
      }
    });
    this.clearSaleList(); 
    return this.isProductNameInDB;
  }

  clearPurchaseList(){
    this.purchaseProductNames = [];
  }

  clearSaleList(){
    this.saleProductNames = [];
  }
}


