import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import * as html2pdf from 'html2pdf.js';
import { PosTransactionService } from 'src/app/components/point-of-sale-add/services/pos-transaction.service';
import { TransactionInfo } from 'src/app/models/transaction-info.model';

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
  

  opt = {
    margin:       0.5,
    filename:     'myfile.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 1 },
    jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
  };

  constructor(private readonly transactionService:PosTransactionService) { }

  @ViewChild('receipt') receipt !: ElementRef;

  ngOnInit(): void {
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
    setTimeout(() => {
      this.convertToPdf();
    }, 1000);
  }

  convertToPdf(){
    html2pdf().set(this.opt).from(this.receipt.nativeElement).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'), '_blank');
    });
  }
}

