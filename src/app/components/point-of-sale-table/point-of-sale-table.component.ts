import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject, Subject } from 'rxjs';
import { Customer } from 'src/app/models/customer-type.enum';
import { TransactionInfo } from 'src/app/models/transaction-info.model';
import { PointOfSaleTransactionHistory } from './services/point-of-sale-table.service';

@Component({
  selector: 'app-point-of-sale-table',
  templateUrl: './point-of-sale-table.component.html',
  styleUrls: ['./point-of-sale-table.component.css'],
  providers: [PointOfSaleTransactionHistory]
})
export class PointOfSaleTableComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  posTransactions: TransactionInfo[] = [];
  posFilteredTransactions: TransactionInfo[] = [];

  dtTrigger: Subject<DataTables.Settings> = new Subject();

  searchFilter:BehaviorSubject<{searchQuery:string,
                        startDate:Date, endDate:Date}>;

  searchQuery:string = "";
  startDate:Date = new Date();
  endDate:Date = new Date();

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering


  constructor(protected posTransactionHistoryService: PointOfSaleTransactionHistory) {
    this.startDate = this.posTransactionHistoryService.addDays(this.startDate, 30);
    this.searchFilter = new BehaviorSubject({searchQuery:this.searchQuery, startDate: this.startDate, endDate: this.endDate});
    
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      searching: false
    };

    this.posTransactionHistoryService.getValue().subscribe((value) => {

      this.posTransactions = value;
      this.rerender();
    });

    this.searchFilter.subscribe(value => {

      this.posFilteredTransactions = this.posTransactions.filter(ele => {
        return ele.transactionDate > value.startDate && ele.transactionDate < value.endDate &&
        (ele.userInfo.firstName.toLowerCase().startsWith(value.searchQuery) ||
        ele.userInfo.lastName.toLowerCase().startsWith(value.searchQuery) ||
        Customer[ele.customerInfo.customerType].toLowerCase().startsWith(value.searchQuery) ||
        ele.customerInfo.name.toLowerCase().includes(value.searchQuery));
      });

      this.rerender();
    });
  }

  rerender(): void {
    this.dtElement?.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.dtOptions);
    });
  }

  setDate(event: any){
    return new Date(event);
  }

  updateTable(){
    this.searchFilter.next({searchQuery:this.searchQuery.toLowerCase(), startDate: this.startDate, endDate: this.endDate});
  }
  
  getCustomerType(customer: Customer){
    return Customer[customer];
  }
}
