import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject, Subject } from 'rxjs';
import { Customer } from 'src/app/models/customer-type.enum';
import { TransactionInfo } from 'src/app/models/transaction-info.model';
import { ProductInfo } from 'src/app/models/product-info.model';
import { PointOfSaleTransactionHistory } from './services/point-of-sale-table.service';
import {DataService} from 'src/app/services/supabase.service'
import { PosTransactionService } from '../point-of-sale-add/services/pos-transaction.service';

@Component({
  selector: 'app-point-of-sale-table',
  templateUrl: './point-of-sale-table.component.html',
  styleUrls: ['./point-of-sale-table.component.css'],
  providers: [PointOfSaleTransactionHistory, DataService]
})
export class PointOfSaleTableComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  posTransactions: TransactionInfo[] = [];
  posFilteredTransactions: TransactionInfo[] = [];
  data: any = '';
  productInfo: ProductInfo[] = [];

  dtTrigger: Subject<DataTables.Settings> = new Subject();

  searchFilter:BehaviorSubject<{searchQuery:string,
                        startDate:Date, endDate:Date}>;

  searchQuery:string = "";
  startDate:Date = new Date();
  endDate:Date = new Date();

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering


  constructor(protected posTransactionHistoryService: PointOfSaleTransactionHistory, protected dataService: DataService, protected pointOfSaleTransaction: PosTransactionService) {
    this.startDate = this.posTransactionHistoryService.addDays(this.startDate, 30);
    this.searchFilter = new BehaviorSubject({searchQuery:this.searchQuery, startDate: this.startDate, endDate: this.endDate});
    // console.log('this.pointOfSaleTransaction');
    // console.log(this.pointOfSaleTransaction);
    
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

    // this.getDataServiceData();
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

  getTodaysTransactions(){
    this.startDate = new Date();
    this.endDate = new Date();
    this.searchFilter.next({searchQuery:this.searchQuery.toLowerCase(), startDate: this.startDate, endDate: this.endDate});
  }

  getThisWeeksTransactions(){
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate(this.endDate.getDate()-7);
    this.searchFilter.next({searchQuery:this.searchQuery.toLowerCase(), startDate: this.startDate, endDate: this.endDate});
  }

  getThisMonthsTransactions(){
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate(this.endDate.getDate()-30);
    this.searchFilter.next({searchQuery:this.searchQuery.toLowerCase(), startDate: this.startDate, endDate: this.endDate});
  }
  
  getCustomerType(customer: Customer){
    return Customer[customer];
  }

  // async getDataServiceData(){
  //   const proInfo: Array<ProductInfo> = [];
  //   const options = await (await this.dataService.getProducts()).data;
  //   options?.map((item)=>{
  //     let proInfo  = new ProductInfo ();
  //     proInfo =({
  //       productId: item.productId,
  //       productCode: item.productCode,
  //       productName: item.productName,
  //       productImageUrl: '',
  //       productUnit: item.MeasureUnit,
  //       price: item.SaleRate,
  //       minPrice: item.MinRate,
  //       maxPrice: 0,
  //     })
  //     this.productInfo.push(proInfo);
  //   });
    
  // }
}
