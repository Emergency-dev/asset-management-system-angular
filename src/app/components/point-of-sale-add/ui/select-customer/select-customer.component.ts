import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer-type.enum';
import { PosTransactionService } from '../../services/pos-transaction.service';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.css']
})
export class SelectCustomerComponent implements OnInit {
  @Output() onSelectCustomer = new EventEmitter<any>();

  customers:Customer[] = [Customer.Regular, Customer.Retailer, Customer.Wholesale];
  selectCustomer?:Customer;
  constructor(protected transactionService: PosTransactionService) { }

  ngOnInit(): void {
    this.selectCustomer = this.transactionService.transactionInfo.customerInfo.customerType;
  }

  getLabel(customer: Customer){
    return Customer[customer];
  }

  onClickCustomer(customer: Customer){
    this.transactionService.transactionInfo.customerInfo.customerType = customer;
    this.onSelectCustomer.emit();
  }

}
