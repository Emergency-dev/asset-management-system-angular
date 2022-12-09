import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { ProductInfo } from 'src/app/models/product-info.model';
import {DataService} from 'src/app/services/supabase.service'
import { Purchase } from './purchase-info.model';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  @ViewChild("pId") pId: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("pName") pName : ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("pList") pList : ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("sId") sId : ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("sName") sName : ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("sList") sList : ElementRef<HTMLInputElement> = {} as ElementRef;
  
  productInfo: ProductInfo[] = [];
  isProductNameInDB: boolean = false;
  isProductCodeInDB: boolean = false;
  productName: string [] = [];
  purchase:Purchase= new Purchase();
  saleList:{saleCode:string,saleName:string}[] = [];
  purchaseProductNames:string[] =[];
  saleProductNames:string[] =[];
  submitSaleList:{code:String}[] = [];

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
    this.pList.nativeElement.focus();
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
    this.pId.nativeElement.value = "";
    this.pName.nativeElement.value = "";
    this.pId.nativeElement.focus(); 
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
    this.pId.nativeElement.value = "";
    this.pName.nativeElement.value = "";
    this.pId.nativeElement.focus();
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
    this.sList.nativeElement.focus(); 
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
    this.sId.nativeElement.value = "";
    this.sName.nativeElement.value = "";
    this.sId.nativeElement.focus(); 
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
    this.sId.nativeElement.value = "";
    this.sName.nativeElement.value = "";
    this.sId.nativeElement.focus(); 
    return this.isProductNameInDB;
  }

  clearPurchaseList(){
    this.purchaseProductNames = [];
  }

  clearSaleList(){
    this.saleProductNames = [];
  }

  Submit(){
    
    console.log(this.purchase.purchaseCode);
    this.saleList.forEach(element => {
      this.submitSaleList.push({code : element.saleCode});
    });
    console.log(this.submitSaleList);
  }
}


