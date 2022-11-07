import { Component, Input, OnInit, Output } from '@angular/core';
import { LayoutConfig } from 'src/app/layout/layout/services/layout-config.service';

@Component({
  selector: 'app-sidebar-icon',
  templateUrl: './sidebar-icon.component.html',
  styleUrls: ['./sidebar-icon.component.css']
})
export class SidebarIconComponent implements OnInit {
  @Input() route: string | null;
  constructor(protected layoutConfig: LayoutConfig) {
    this.route = null;
  }

  ngOnInit(): void {
  }
}
