import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { DataService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-edit-customer-page',
  templateUrl: './edit-customer-page.component.html',
  styleUrls: ['./edit-customer-page.component.css']
})
export class EditCustomerPageComponent implements OnInit {
  @ViewChild("custName") custName: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("custCode") custCode: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("address") address: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("city") city: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("phoneNumber") phoneNumber: ElementRef<HTMLInputElement> = {} as ElementRef;
  // @ViewChild("WHRate") WHRate: ElementRef<HTMLInputElement> = {} as ElementRef;
  // @ViewChild("Package") Package: ElementRef<HTMLInputElement> = {} as ElementRef;
  // @ViewChild("productUnit") productUnit: ElementRef<HTMLInputElement> = {} as ElementRef;
  // @ViewChild("Category") Category: ElementRef<HTMLInputElement> = {} as ElementRef;
  @Output() finishEvent = new EventEmitter<any>();


  p:number =0;
  custId:number =0;
  listingPage:boolean=true;
  updatePage: boolean=false;
  customersList: CustomerInfo[]=[];
  customer: CustomerInfo=new CustomerInfo();
  alert:boolean=false;
  success:boolean=false;
  constructor( protected dataService: DataService) { }

  ngOnInit(): void {
    this.getCustomersData();
  }
  async getCustomersData(){
    const cusInfo: Array<CustomerInfo> = [];
    const cusOptions = await (await this.dataService.getCustomers()).data;
    cusOptions?.map((item)=>{
      let cusInfo  = new CustomerInfo ();
      cusInfo =({
        customerCode: item.CustomerCode,
        name: item.CustomerName,
        address: item.Address,
        contactNumber: item.Mobile,
        customerType: 1,
        OrganizationCode: 0,
        OrganizationName: '',
        CityName: item.CityName,
        customerId:item.CustomerId
      })
      this.customersList.push(cusInfo);
    });
  }
  async getCustomerInfoByID(id: any) {
    const cusOptions = await (await this.dataService.getCustomerById(id)).data;
    cusOptions?.map((item)=>{
      let cusInfo  = new CustomerInfo ();
      cusInfo =({
        customerCode: item.CustomerCode,
        name: item.CustomerName,
        address: item.Address,
        contactNumber: item.Mobile,
        customerType: 1,
        OrganizationCode: 0,
        OrganizationName: '',
        CityName: item.CityName,
        customerId:item.CustomerId
      })
      this.customer=cusInfo;
      this.setInputValue();
    });
  }
  setInputValue() {
    //this.updatePage=true;
    this.custId=this.customer.customerId;
    this.custName.nativeElement.value=this.customer.name;
    this.custCode.nativeElement.value=(this.customer.customerCode).toString();
    this.address.nativeElement.value=(this.customer.address);
    this.city.nativeElement.value=(this.customer.CityName);
    this.phoneNumber.nativeElement.value=(this.customer.contactNumber);
  }
  getCustomerDetails(id:any){
    this.getCustomerInfoByID(id);
    this.updatePage=true;
    this.listingPage=false;
    // setTimeout(() => {
    //   this.setInputValue();
    // }, 50);
  }
  Validating(): boolean {
    if(this.custName.nativeElement.value.length==0
      ||this.custCode.nativeElement.value.length==0
      ||this.address.nativeElement.value.length==0
      ||this.city.nativeElement.value.length==0
      ||this.phoneNumber.nativeElement.value.length==0
      ){
      return false;
    }
    else{
      return true;
    }
  }
  updateCustomerDetails(){
    if(this.Validating()){
      this.dataService.updateCustomerById(
        this.custId,
        this.custName.nativeElement.value,
        this.address.nativeElement.value,
        this.city.nativeElement.value,
        this.phoneNumber.nativeElement.value,
        this.custCode.nativeElement.value)
      //alert("Product Updated");
      this.success=true;
      setTimeout(() => {
        this.success=false;
        this.closeModel();
      }, 2000);
    }
    else{
      this.alert=true;
      setTimeout(() => {
        this.alert=false;
      }, 2000);
    }
  }
  Back(){
    this.listingPage=true;
    this.updatePage=false;
    this.customer=new CustomerInfo();
  }
  closeModel() {
    this.finishEvent.emit();
  }

}
