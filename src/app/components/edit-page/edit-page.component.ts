import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { count } from 'rxjs';
import { ProductInfo } from 'src/app/models/product-info.model';
import { DataService } from 'src/app/services/supabase.service';
import { editProdInfo } from './editProdInfo.model';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent implements OnInit {
  @ViewChild("pListName") pListName: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("pName") pName: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("pId") pId: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("prodName") prodName: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("SaleRate") SaleRate: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("WHRate") WHRate: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("Package") Package: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("productUnit") productUnit: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("Category") Category: ElementRef<HTMLInputElement> = {} as ElementRef;

  @Output() finishEvent = new EventEmitter<any>();


  isProductCodeInDB: boolean = false;
  productInfo: editProdInfo = new editProdInfo();
  productInfoList: editProdInfo[] = [];
  prodNameList: string[]=[];
  prodCode: any='';
  constructor(protected dataService: DataService) { }

  ngOnInit(): void {
  }
  async getSelectedProductInfo(){
    // this.dataService.getSelectedProducts(this.pId.nativeElement.value);
    const regex = new RegExp(/^[0-9]+$/);
    //alert(regex.test(this.pId.nativeElement.value))
    if(regex.test(this.pId.nativeElement.value)){
      const options = await (await this.dataService.getSelectedProducts(this.pId.nativeElement.value)).data;
      if(options?.length!=0){
        this.prodCode=this.pId.nativeElement.value;
        options?.map((item) => {
        let proInfo = new editProdInfo();
        proInfo = ({
          productId: item.ProductId,
          productCode: item.ProductCode,
          productName: item.ProductName,          
          productUnit: item.MeasureUnit,
          SalePrice: item.SaleRate,
          WHPrice: item.WHRate,
          minPrice: item.MinRate,
          maxPrice: 0,
          MeasureUnit:item.MeasureUnit,
          packing : Number(item.Packing),
          urduName : item.UrduName,
          Category:item.Category
        })
        this.productInfo = (proInfo);
        console.log(proInfo);
      })
      this.setInputValue();
      }
      else{
        alert("Product is NOT In Database")
      }
    }
    else
    {
      alert("Enter Product Code")
    }
  }
  async getSelectedProductInfoByName(){
    // this.dataService.getSelectedProducts(this.pId.nativeElement.value);
    // this.prodNameList=[]
    const regex = new RegExp(/^[a-zA-Z ]*$/);
    if(regex.test(this.pName.nativeElement.value)){
      const options = await (await this.dataService.getSelectedProductsByName(this.pName.nativeElement.value)).data;
      if(options?.length!=0){
        this.prodCode=this.pId.nativeElement.value;
        options?.map((item) => {
        let proInfo = new editProdInfo();
        proInfo = ({
          productId: item.ProductId,
          productCode: item.ProductCode,
          productName: item.ProductName,          
          productUnit: item.MeasureUnit,
          SalePrice: item.SaleRate,
          WHPrice: item.WHRate,
          minPrice: item.MinRate,
          maxPrice: 0,
          MeasureUnit:item.MeasureUnit,
          packing : Number(item.Packing),
          urduName : item.UrduName,
          Category:item.Category
        })
        this.productInfoList.push(proInfo);
        this.prodNameList.push(proInfo.productName);
        // console.log(proInfo);
      })
      }
      else{
        alert("Product is NOT In Database")
      }
    }
    else
    {
      alert("Enter Product Name")
    }
  }
  setInputValue() {
    this.prodCode=this.productInfo.productCode;
    this.prodName.nativeElement.value=this.productInfo.productName;
    this.SaleRate.nativeElement.value=(this.productInfo.SalePrice).toString();
    this.WHRate.nativeElement.value=(this.productInfo.WHPrice).toString();
    this.Package.nativeElement.value=(this.productInfo.packing).toString();
    this.productUnit.nativeElement.value=(this.productInfo.productUnit);
    this.Category.nativeElement.value=(this.productInfo.Category);

  }
  getEnteredProductInfo() {
    this.pListName.nativeElement.value;
    this.productInfoList.forEach((value) => {
      if (value.productName == this.pListName.nativeElement.value ) {
        this.productInfo = value;
        console.log(value);
        this.setInputValue();
      }
      
    });
    }
  addProductBackup() {
    this.dataService.addEditProduct(
      this.productInfo.productCode,this.productInfo.Category,this.productInfo.productName,this.productInfo.packing,
      this.productInfo.MeasureUnit,this.productInfo.SalePrice,this.productInfo.WHPrice,this.productInfo.urduName)
  }
  saveEditProduct(){
    if(this.prodCode!=''){
      this.addProductBackup();
      this.dataService.updateSelectedProducts(
        this.prodCode,
        this.Category.nativeElement.value,
        this.prodName.nativeElement.value,
        this.Package.nativeElement.value,
        this.productUnit.nativeElement.value,
        this.SaleRate.nativeElement.value,
        this.WHRate.nativeElement.value
      )
      alert("Product Updated");
      this.closeModel();
    }
    else{
      alert("Please enter product info!")
    }
  }
  
  ClearProduct() {
  this.prodNameList=[];
  this.productInfoList=[];
  this.productInfo=new editProdInfo();
  this.setInputValue();
  }
  closeModel() {
  this.finishEvent.emit();
  }
}
