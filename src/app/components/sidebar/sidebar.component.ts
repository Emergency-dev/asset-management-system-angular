import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutConfig } from 'src/app/layout/layout/services/layout-config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(protected layoutConfig: LayoutConfig) { }
  @Output() finishEvent = new EventEmitter<any>();
  ngOnInit(): void {
  }

  toggleExpansion(){
    this.layoutConfig.isSidebarExpanded = !this.layoutConfig.isSidebarExpanded;
  }
  logOut(){
    localStorage.setItem('Login','');
    this.finishEvent.emit(false);
  }

}
