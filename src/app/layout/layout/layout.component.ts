import { Component, OnInit } from '@angular/core';
import { LayoutConfig } from './services/layout-config.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor(protected layoutConfig: LayoutConfig) {
    
  }

  ngOnInit(): void {
  }

}
