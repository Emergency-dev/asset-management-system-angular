import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutConfig } from 'src/app/layout/layout/services/layout-config.service';

@Component({
  selector: 'app-sidebar-icon',
  templateUrl: './sidebar-icon.component.html',
  styleUrls: ['./sidebar-icon.component.css']
})
export class SidebarIconComponent implements OnInit {
  constructor(protected layoutConfig: LayoutConfig) { }

  ngOnInit(): void {
  }
}
