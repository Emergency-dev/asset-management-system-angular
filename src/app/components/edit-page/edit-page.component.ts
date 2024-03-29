import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { count, Subject } from 'rxjs';
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
  @ViewChild("DiscountType") DiscountType: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("Discount") Discount: ElementRef<HTMLInputElement> = {} as ElementRef;

  @Output() finishEvent = new EventEmitter<any>();

  categoryName:string[]=[];
  unitName:string[]=[];
  isProductCodeInDB: boolean = false;
  productInfo: editProdInfo = new editProdInfo();
  productInfoList: editProdInfo[] = [];
  prodList: editProdInfo[] = [];
  prodNameList: string[]=[];
  prodCode: any='';
  updatePage: boolean=false;
  listingPage: boolean=true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<DataTables.Settings> = new Subject();
  p:number=0;
  alert:boolean=false;
  success:boolean=false;
  cartonPrice:any;
  discountPrice:any;
  constructor(protected dataService: DataService) { }

  ngOnInit(): void {
    this.getAllProducts('');
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
  async getSelectedProductInfo(){
    // this.dataService.getSelectedProducts(this.pId.nativeElement.value);
    const regex = new RegExp(/^[0-9]+$/);
    if(regex.test(this.pId.nativeElement.value)){
      const options = await (await this.dataService.getSelectedProducts(this.pId.nativeElement.value)).data;
      if(options?.length!=0){
        this.listingPage=false;
        this.updatePage=true;
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
          Category:item.Category,
          CartonPrice:item.CartonPrice
        })
        this.productInfo = (proInfo);
        console.log(proInfo);
      })
      setTimeout(() => {
        this.setInputValue();
      }, 100);
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
        this.listingPage=false;
        this.updatePage=true;
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
          Category:item.Category,
          CartonPrice:item.CartonPrice
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
  async getAllProducts(event:any){
    const options = await (await this.dataService.getSelectedProductsByName(event)).data;
      if(options?.length!=0){
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
          Category:item.Category,
          CartonPrice:item.CartonPrice
        })
        this.prodList.push(proInfo);
        if(!this.categoryName.includes(item.Category))
        {
          this.categoryName.push(item.Category);
        }
        if(!this.unitName.includes(item.MeasureUnit))
        {
          this.unitName.push(item.MeasureUnit);
        }
        // console.log(proInfo);
      })
  }
}
  setInputValue() {
    //this.updatePage=true;
    this.prodCode=this.productInfo.productCode;
    this.cartonPrice=this.productInfo.WHPrice*this.productInfo.packing;
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
      if (value.productCode == this.pListName.nativeElement.value ) {
        this.productInfo = value;
        console.log(value);
        this.setInputValue();
      }
      // else{
      //   this.ClearProduct();
      // }
    });
  }
  getEnteredProductInfoByID(event:any) {
    this.listingPage=false;
    this.updatePage=true;
    this.prodList.forEach((value) => {
      if (value.productCode == event ) {
        this.productInfo = value;
        console.log(value);
      }
    });
    setTimeout(() => {
      this.setInputValue();
    }, 100);
    }
  addProductBackup() {
    this.dataService.addEditProduct(
      this.productInfo.productCode,this.productInfo.Category,this.productInfo.productName,this.productInfo.packing,
      this.productInfo.MeasureUnit,this.productInfo.SalePrice,this.productInfo.WHPrice,this.productInfo.urduName)
  }
  SetCartonPrice(){
    this.discountPrice= (this.Discount.nativeElement.value);
    if(this.DiscountType.nativeElement.value=='Price'){
      this.cartonPrice=this.cartonPrice-this.discountPrice;
    }
    else{
      this.cartonPrice=this.cartonPrice - this.cartonPrice*(this.discountPrice/100);
    }
  }
  saveEditProduct(){
    if(this.prodCode!=''){
      this.addProductBackup();
      this.SetCartonPrice();
      this.dataService.updateSelectedProducts(
        this.prodCode,
        this.Category.nativeElement.value,
        this.prodName.nativeElement.value,
        this.Package.nativeElement.value,
        this.productUnit.nativeElement.value,
        this.SaleRate.nativeElement.value,
        this.WHRate.nativeElement.value,
        this.cartonPrice
      )
      //alert("Product Updated");
      this.success=true;
      setTimeout(() => {
        this.success=false;
        this.closeModel();
      }, 2000);
    }
    else{
      //alert("Please enter product info!");
      this.alert=true;
      setTimeout(() => {
        this.alert=false;
      }, 3000);
    }
  }
  
  ClearProduct() {
    this.prodNameList=[];
    this.productInfoList=[];
    this.productInfo=new editProdInfo();
    //this.setInputValue();

  }
  back(){
    this.updatePage=false;
    this.listingPage=true;
    this.ClearProduct();
    this.pName.nativeElement.value=''
    this.pId.nativeElement.value=''
  }
  closeModel() {
  this.finishEvent.emit();
  }
}
