import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject, Subject } from 'rxjs';
import { Customer } from 'src/app/models/customer-type.enum';
import { CartItemInfo, TransactionInfo } from 'src/app/models/transaction-info.model';
import { ProductInfo } from 'src/app/models/product-info.model';
import {DataService} from 'src/app/services/supabase.service'
import { PosTransactionService } from '../point-of-sale-add/services/pos-transaction.service';
import { TransactionListService } from './services/transaction-list.service';
import { TransactionSupabaseInfo } from 'src/app/models/transaction-supabase.model';
import { TotalPrice } from '../point-of-sale-add/ui/cart/TotalPrice.model';
import { Data } from '@angular/router';

@Component({
  selector: 'app-point-of-sale-table',
  templateUrl: './point-of-sale-table.component.html',
  styleUrls: ['./point-of-sale-table.component.css'],
  providers: [DataService, TransactionListService]
})
export class PointOfSaleTableComponent implements OnInit, AfterViewInit {
  @ViewChild("cartonCount") cartonCount: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("quantityCount") quantityCount: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("priceCount") priceCount: ElementRef<HTMLInputElement> = {} as ElementRef;


  @Output() finishTransaction:EventEmitter<TransactionInfo> = new EventEmitter();
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

  //Taha Added
  //reviewList:{productCode:string,productName:string,quantity:number,unit:string,perUnitPrice:number,totalPrice:number,customerName:string,customerPhone:string}[] = [];
  //reviewList : TransactionInfo[] = []; 
   //reviewList:TransactionInfo[] = []; 
   reviewList:TransactionSupabaseInfo[] = [];
   totalPrice:number[] = [];
   totalProducts:number[]=[];
   isNewPageModalOpen:boolean = false;
   selectedTransactionId:number = -1; 
   selectedCustomerName:string = "";
   selectedCustomerId:string="";
   selectedTransactionDate:Date = new Date;
   selectedTransactionProductInfo:{productCode:string,productName:string,urduName:string,quantity:number,unit:string,totalPrice:number}[] = [];
   transactionInfo:TransactionInfo = new TransactionInfo;
   isEditMode:boolean=false;
   isAdmin=false;
   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering


  constructor(protected dataService: DataService, protected pointOfSaleTransaction: PosTransactionService,
    protected transactionInfoList1: TransactionListService) {
    // this.startDate = this.posTransactionHistoryService.addDays(this.startDate, 30);
    this.searchFilter = new BehaviorSubject({searchQuery:this.searchQuery, startDate: this.startDate, endDate: this.endDate});
    console.log('this.posTransactions');
    console.log(this.posTransactions);
    this.RefreshReviewList("");
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnInit(): void {
    this.checkAdmin();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      searching: false
    };

    // this.posTransactionHistoryService.getValue().subscribe((value) => {

    //   this.posTransactions = value;
    //   this.rerender();
    // });

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

  //Added Emitter by Taha
  // sendStatus(value:string){

  // }
  

  async RefreshReviewList(e:any){
    //this.reviewList = this.transaction;
    //console.log(this.dataService);
    //console.log(this.serviceReviewList.getReviewList());
    //this.reviewList.push(e) ;
    //const Info: Array<TransactionSupabaseInfo> = [];
    console.log("refresh");
    this.reviewList = [];
    const options = await (await (this.dataService.getTransaction())).data;
    options?.map((item)=>{
      let transactionSupabaseInfo  = new TransactionSupabaseInfo();
      transactionSupabaseInfo =({
        transactionId: item.id,
        transactionDate: item.Date,
        SellerName: item.SellerName,
        CustomerName: item.CustomerName,
        TotalProducts : item.TotalProducts,
        TotalPrice : item.TotalPrice,
        CustomerId: item.CustomerId
      })
      this.reviewList.push(transactionSupabaseInfo);
    });
    // this.totalPrice = [];
    // this.totalProducts =[];
    // for(let i=0;i<this.reviewList.length;i++){
    //   let price=0;
    //   this.reviewList[i].cartItemList.forEach(element => {
    //     if(element) price += element.quantity * element.price;
    //   });
    //   this.totalPrice.push(price);
    // }
    // for(let i=0;i<this.reviewList.length;i++){
    //   let products=0;
    //   this.reviewList[i].cartItemList.forEach(element => {
    //     if(element) products += 1;
    //   });
    //   this.totalProducts.push(products);
    // }
    // console.log(this.totalPrice);
    // console.log(this.totalProducts);
    // this.reviewList.cartItemList.forEach(element => {
    //   if(element) this.totalPrice += 1;
    // });
    console.log('this.reviewList');
    console.log(this.reviewList);
  }

  async onNewPageClick(id:any,cust:any,cust_id:any,trans_date:any){
    this.transactionInfo = new TransactionInfo;
    this.selectedTransactionProductInfo = [];
    this.isNewPageModalOpen= true;
    this.selectedTransactionId = id;
    this.selectedCustomerName = cust;
    this.selectedCustomerId = cust_id;
    this.transactionInfo.customerInfo.customerId = cust_id;
    this.transactionInfo.customerInfo.name = cust;
    this.selectedTransactionDate = trans_date;
    let grandTotal = 0;
    let res1 = (await this.dataService.getOrderData(this.selectedCustomerId, this.selectedTransactionDate)).data;
    let res2 = (await this.dataService.getProducts()).data;
    res2?.forEach(item1=>{
      res1?.forEach(item2=>{
        if(item1.ProductCode == item2.ProductId){
          item1.quantity = item2.ProductQuantity;
          let veryLocalCartItemInfo: CartItemInfo = new CartItemInfo();
          if(item2.CustomerType=='Wholesale'){
            this.selectedTransactionProductInfo.push({productCode:item1.ProductCode,productName:item1.ProductName,urduName:item1.UrduName,quantity:item1.quantity+item1.Packing*item2.CartonQuantity,unit:item1.WHRate,totalPrice:item1.quantity*item1.WHRate});
            // this.cartonCount.nativeElement.value=item2.CartonQuantity;
            // this.priceCount.nativeElement.value=item1.WHRate;
            // this.quantityCount.nativeElement.value=item1.quantity;
            veryLocalCartItemInfo.price = item1.WHRate;
            veryLocalCartItemInfo.productInfo.productUnit = item1.WHRate;
            veryLocalCartItemInfo.cartonPrice =  item1.CartonPrice;
            if(item1.CartonPrice>0){
              veryLocalCartItemInfo.totalPrice = item1.quantity*item1.WHRate + item2.CartonQuantity*item1.CartonPrice
              grandTotal+=item1.quantity*item1.WHRate + item2.CartonQuantity*item1.CartonPrice;
          }
            else{
              veryLocalCartItemInfo.totalPrice = (item1.quantity+item1.Packing*item2.CartonQuantity)*item1.WHRate;
              grandTotal+=(item1.quantity+item1.Packing*item2.CartonQuantity)*item1.WHRate;
            }
          }
          else{
            this.selectedTransactionProductInfo.push({productCode:item1.ProductCode,productName:item1.ProductName,urduName:item1.UrduName,quantity:item1.quantity+item1.Packing*item2.CartonQuantity,unit:item1.SaleRate,totalPrice:item1.quantity*item1.SaleRate});
            // this.cartonCount.nativeElement.value=item2.CartonQuantity;
            // this.priceCount.nativeElement.value=item1.SaleRate;
            // this.quantityCount.nativeElement.value=item1.quantity;
            veryLocalCartItemInfo.price = item1.SaleRate;
            veryLocalCartItemInfo.productInfo.productUnit = item1.SaleRate;
            veryLocalCartItemInfo.cartonPrice =  item1.CartonPrice;
            if(item1.CartonPrice>0){
              veryLocalCartItemInfo.totalPrice = item1.quantity*item1.SaleRate + item2.CartonQuantity*item1.CartonPrice
              grandTotal+=item1.quantity*item1.SaleRate + item2.CartonQuantity*item1.CartonPrice;
          }
            else{
              veryLocalCartItemInfo.totalPrice = (item1.quantity+item1.Packing*item2.CartonQuantity)*item1.SaleRate;
              grandTotal+=(item1.quantity+item1.Packing*item2.CartonQuantity)*item1.SaleRate;
            }
            // veryLocalCartItemInfo.totalPrice = (item1.quantity+item1.Packing*item2.CartonQuantity)*item1.SaleRate;
            // grandTotal+=(item1.quantity+item1.Packing*item2.CartonQuantity)*item1.SaleRate;
          }
          veryLocalCartItemInfo.productInfo.productCode = item1.ProductCode;
          veryLocalCartItemInfo.productInfo.productName = item1.ProductName;
          veryLocalCartItemInfo.productInfo.urduName = item1.UrduName;
          veryLocalCartItemInfo.quantity = item1.quantity;
          veryLocalCartItemInfo.cartonQuantity = item2.CartonQuantity;
          veryLocalCartItemInfo.productInfo.packing = item1.Packing;
          this.transactionInfo.transactionDate = item2.OrderDate;
          //veryLocalCartItemInfo.unit = this.cartItemInfo.unit;
          // console.log('veryLocalCartItemInfo');
          // console.log(veryLocalCartItemInfo);
          if(item2.BillNumber){
            this.transactionInfo.transactionId=item2.BillNumber;
          }          
          console.log(this.transactionInfo.customerInfo.customerId)
          this.transactionInfo.cartItemList.push(veryLocalCartItemInfo);
        }
      })
    })
    this.transactionInfo.grandTotal=grandTotal;
  }

  onNewPageClose(){
    this.isNewPageModalOpen = false;
    this.isEditMode=false;
  }
  EditOn(){
    this.isEditMode=true;
  }
  Back(){
    this.isEditMode=false;
  }
  saveEditProduct(){
    console.log('CALLED');
    this.transactionInfo.cartItemList.forEach(item => {
      if(item.cartonQuantity > 0 
        || item.quantity > 0 ){
          this.dataService.updateOrderData(this.selectedCustomerId,this.selectedTransactionDate,item.productInfo.productCode,item.cartonQuantity,item.quantity);
        }
        else{
          alert("Please fill all fields");
        }
      });
      this.onNewPageClose()
  }
  onClickPrint(){
    console.log('this.transactionInfo')
    console.log(this.transactionInfo)
    console.log(this.transactionInfo.customerInfo.customerId)
    this.finishTransaction.emit(this.transactionInfo);
  }
  checkAdmin(){
    if(localStorage.getItem('Admin')=='true'){
      this.isAdmin=true;
    }
    else{
      this.isAdmin=false;
    }
  }
}
