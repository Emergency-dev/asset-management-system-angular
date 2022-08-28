import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutConfig } from 'src/app/layout/layout/services/layout-config.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() isModalOpen:boolean = false;
  @Output() closeModal = new EventEmitter<any>();
  @Output() onComplete = new EventEmitter<any>();

  constructor(protected layoutConfig: LayoutConfig) { }

  ngOnInit(): void {
  }

  onClose(){
    this.closeModal.emit();
  }

}
