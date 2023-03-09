import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LayoutConfig } from 'src/app/layout/layout/services/layout-config.service';
import { LoginInfo } from 'src/app/models/login-info';
import { LoginService } from 'src/app/pages/login-page/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [LoginService]
})
export class SidebarComponent implements OnInit {
  constructor(protected layoutConfig: LayoutConfig, protected loginService: LoginService) { }
  isAdmin=false;
  @Output() finishEvent = new EventEmitter<any>();
  ngOnInit(): void {
    //console.log(this.loginService)
    this.checkAdmin();
  }

  toggleExpansion(){
    this.layoutConfig.isSidebarExpanded = !this.layoutConfig.isSidebarExpanded;
  }
  checkAdmin(){
    if(localStorage.getItem('Admin')=='true'){
      this.isAdmin=true;
    }
    else{
      this.isAdmin=false;
    }
  }
  logOut(){
    this.loginService.loginInfo.isLoggedIn=false;
    localStorage.setItem('Login','');
    localStorage.setItem('Admin','');
    this.finishEvent.emit(this.loginService.loginInfo);
  }

}
