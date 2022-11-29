import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CartItemInfo } from 'src/app/models/transaction-info.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, AfterViewInit {

  @Input() item: CartItemInfo = new CartItemInfo();
  @Output() onItemCheckClick = new EventEmitter<any>();
  @Output() onChangeQuantity = new EventEmitter<any>();
  @Output() onEnterQuantity = new EventEmitter<any>();

  @ViewChild('cartonCount') cartonCount!: ElementRef<HTMLInputElement>;

  constructor() { }
  ngAfterViewInit(): void {
    this.cartonCount.nativeElement.focus();
  }

  ngOnInit(): void {}

  checkBoxChecked(event: any){
    this.onItemCheckClick.emit(event);
  }

  updateTotalPrice(){
    this.onEnterQuantity.emit();
  }

  ClearTotalPrice(){
    this.onChangeQuantity.emit();
  }

}
