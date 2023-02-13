import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  @Output() finishEvent = new EventEmitter<any>();

  @ViewChild("cust_prodname") cust_prodname: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_urduname") cust_urduname: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_Category") cust_Category: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_Unit") cust_Unit: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_pack") cust_pack: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_Retail") cust_Retail: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_WH") cust_WH: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_Code") cust_Code: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_Wt") cust_Wt: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_CBM") cust_CBM: ElementRef<HTMLInputElement> = {} as ElementRef;

  alert:boolean=false;
  codeAlert:boolean=false;
  categoryName:string[]=[];
  
  unitName:string[]=[];
  prodCode:number[]= [];
  number:number=0
  constructor(protected dataService: DataService) { }

  ngOnInit(): void {
    this.getAllProducts('');
  }
  Validations():boolean{
    if(this.cust_prodname.nativeElement.value==''||
    this.cust_urduname.nativeElement.value==''|| 
    this.cust_Category.nativeElement.value==''||
    this.cust_Unit.nativeElement.value==''||
    this.cust_pack.nativeElement.value==''||
    this.cust_Retail.nativeElement.value=='' ||
    this.cust_WH.nativeElement.value=='')
    {
      //alert("Wrong Information!");
      this.alert=true;
      return false;
    }
    else if(this.getMissingNo(this.prodCode))
    {
      this.codeAlert=true;
      return false;
    }
    // else if(this.cust_uname.nativeElement.value.length<=2)
    // {
    //   alert('User Name Must be greater than 2 characters')
    //   return false;
    // }
    // else if(this.cust_pass.nativeElement.value!=this.cust_conpass.nativeElement.value){
    //   alert('Confirm Password is Incorrect')
    //   return false;
    // }
    // else if(this.cust_pass.nativeElement.value.length<7){
    //   alert('Password should be greater than 8 characters')
    //   return false;
    // }
    else{
      return true
    }
  }
  addProduct(){
    if(this.Validations()){
      this.dataService.insertNewProducts(this.cust_Code.nativeElement.value,
        this.cust_Category.nativeElement.value.toUpperCase(),
        this.cust_prodname.nativeElement.value.toUpperCase(),this.cust_pack.nativeElement.value,
        this.cust_Unit.nativeElement.value.toUpperCase(),this.cust_Retail.nativeElement.value,
        this.cust_WH.nativeElement.value,this.cust_urduname.nativeElement.value,
        this.cust_CBM.nativeElement.value,this.cust_Wt.nativeElement.value
        );
    this.finishEvent.emit()
    }
    else if(this.alert){
      setTimeout(() => {
      this.alert=true;
        this.alert=false;        
      }, 3000);
    }
    else if(this.codeAlert){
      setTimeout(() => {
      this.codeAlert=true;
        this.codeAlert=false;        
      }, 6000);
    }
  }
  async getAllProducts(event:any){
    const options = await (await this.dataService.getSelectedProductsByName(event)).data;
      if(options?.length!=0){
        options?.map((item) => {        
        this.prodCode.push(item.ProductCode);
        if(!this.categoryName.includes(item.Category))
        {
          this.categoryName.push(item.Category);
        }
        if(!this.unitName.includes(item.MeasureUnit))
        {
          this.unitName.push(item.MeasureUnit);
        }
      })
  }  
}
  getMissingNo(prodCodes)
  {
    this.number=0
    let isValid=false;
    prodCodes.forEach(element => {
      if(element==this.cust_Code.nativeElement.value){
        for (let i = 0; i < prodCodes.length; i++) {
          this.number+=1;
          if (!prodCodes.includes(this.number)) {
            break;
          }          
        }
        isValid=true;
        //("Product Code ALREADY exists! Next Suggested Product code is "+this.number);
      }
    });
    return isValid;
  }

  }
