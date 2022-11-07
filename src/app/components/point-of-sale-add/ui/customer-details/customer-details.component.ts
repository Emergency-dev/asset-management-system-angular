import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer-type.enum';
import { ProductInfo } from 'src/app/models/product-info.model';
import { CustomerInfo } from 'src/app/models/customer-info.model';
import { CustomerInfoService } from 'src/app/components/point-of-sale-add/ui/customer-details/services/customer-details.service';
import { PosTransactionService } from '../../services/pos-transaction.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  providers: [CustomerInfoService]
})
export class CustomerDetailsComponent implements OnInit {

  customers:Customer[] = [Customer.Regular, Customer.Retailer, Customer.Wholesale];
  listCustomer:CustomerInfo[]=[];
  selectCustomer?:Customer;  
  customerInfo: CustomerInfo=new CustomerInfo();


  constructor(protected transactionService: PosTransactionService,
    protected customerService: CustomerInfoService) { }
  
  ngOnInit(): void {
    this.selectCustomer = this.transactionService.transactionInfo.customerInfo.customerType;
    this.listCustomer = this.customerService.customerInfoList;
    this.customerInfo = this.customerService.customerInfo;
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
