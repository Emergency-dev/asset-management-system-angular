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

  alert=false;
  constructor(protected dataService: DataService) { }

  ngOnInit(): void {
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
        this.cust_Category.nativeElement.value,
        this.cust_prodname.nativeElement.value,this.cust_pack.nativeElement.value,
        this.cust_Unit.nativeElement.value,this.cust_Retail.nativeElement.value,
        this.cust_WH.nativeElement.value,this.cust_urduname.nativeElement.value
        );
    this.finishEvent.emit()
    }
    else{
      this.alert=true;
      setTimeout(() => {
        this.alert=false;        
      }, 3000);
    }
    // this.user.firstName=this.cust_fname.nativeElement.value;
    // this.user.lastName=this.cust_lname.nativeElement.value;
    // this.user.username=this.cust_uname.nativeElement.value;
    // //this.user.pas=this.cust_fname.nativeElement.value;
    // this.user.firstName=this.cust_fname.nativeElement.value;
    // this.user.userActive= this.cust_active.nativeElement.checked;
    // this.user.userAdmin=this.cust_admin.nativeElement.checked;
    //alert(this.cust_active.nativeElement.value)
  }


  }
