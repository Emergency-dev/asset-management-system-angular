import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-point-of-purchase',
  templateUrl: './point-of-purchase.component.html',
  styleUrls: ['./point-of-purchase.component.css']
})
export class PointOfPurchaseComponent implements OnInit {
  isAddModalOpen:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onAddClick(){
    this.isAddModalOpen = true;
  }

  onClose(){
    this.isAddModalOpen = false;
  }

}
