import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css']
})
export class PointOfSaleComponent implements OnInit {
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
