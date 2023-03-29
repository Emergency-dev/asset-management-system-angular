import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import * as html2pdf from 'html2pdf.js';
import { PosTransactionService } from 'src/app/components/point-of-sale-add/services/pos-transaction.service';
import { LoginInfo } from 'src/app/models/login-info';
import { TransactionInfo } from 'src/app/models/transaction-info.model';
import { DataService } from 'src/app/services/supabase.service';
import { LoginService } from '../login-page/services/login.service';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css']
})
export class PointOfSaleComponent implements OnInit {
  isAddModalOpen:boolean = false;
  isNewPageModalOpen:boolean = false;
  transactionInfo!: TransactionInfo;
  ShowPhoneNumber:boolean=false;
  isEditPageModelOpen:boolean=false;
  isEditCustPageModelOpen:boolean=false;
  isAddPageModelOpen:boolean=false;
  isLoggedIn=false;
  isAdmin=false;
  logedinInfo:LoginInfo = new LoginInfo();

  recieptPages:number[] = [];
  itemsPerPage:number = 10;

  opt = {
    margin:       0.5,
    filename:     'myfile.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 1 },
    jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
  };

  constructor(private readonly transactionService:PosTransactionService,protected readonly loginService: LoginService) { }

  @ViewChild('receipt') receipt !: ElementRef;

  ngOnInit(): void {
    console.log(this.loginService.loginInfo)
    this.checkAdmin();
  }

  onAddClick(){
    this.isAddModalOpen = true;
  }

  onClose(){
    this.isAddModalOpen = false;
  }

  onNewPageClick(){
    this.isNewPageModalOpen= true;
  }

  onNewPageClose(){
    this.isNewPageModalOpen = false;
  }
  onEditPageClick(){
    this.isEditPageModelOpen=true;
  }
  onEditPageClose(){
    this.isEditPageModelOpen=false;
  }
  onAddPageClick(){
    this.isAddPageModelOpen=true;
  }
  onAddPageClose(){
    this.isAddPageModelOpen=false;
  }
  onEditCustPageClick(){
    this.isEditCustPageModelOpen=true;
  }
  onEditCustPageClose(){
    this.isEditCustPageModelOpen=false;
  }
  checkAdmin(){
    if(localStorage.getItem('Admin')=='true'){
      this.isAdmin=true;
    }
    else{
      this.isAdmin=false;
    }
  }

  closeModalOnFinish(e:TransactionInfo){
    if(e.phoneNumber!=''){
      this.ShowPhoneNumber=true;
    }
    else{
      this.ShowPhoneNumber=false;
    }
    this.isAddModalOpen = false;
    this.transactionInfo = new TransactionInfo;
    this.transactionInfo = e;

    this.recieptPages = Array(Math.ceil(this.transactionInfo.cartItemList.length / this.itemsPerPage)).fill(0).map((a, i) => i);

    setTimeout(() => {
      this.convertToPdf();
    }, 1000);
  }

  convertToPdf(){
    html2pdf().set(this.opt).from(this.receipt.nativeElement).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'), '_blank');
    });
  }

  getPageItems(pageNumber: number){
    return this.transactionInfo.cartItemList.slice(pageNumber * this.itemsPerPage, (pageNumber * this.itemsPerPage) + this.itemsPerPage);
  }
}

