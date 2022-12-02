import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css']
})
export class PointOfSaleComponent implements OnInit {
  isAddModalOpen:boolean = false;
  isNewPageModalOpen:boolean = false;

  // @Output() public sendStatus = new EventEmitter<string>();

  constructor() { }

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
}
