import { Component, OnInit } from '@angular/core';
import { LoginInfo } from './models/login-info';
import { LoginService } from './pages/login-page/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent implements OnInit{
  title = 'asset-management-system';
  isLoggedIn=false;
  userInfo:LoginInfo=new LoginInfo();
  constructor(protected loginService: LoginService) { }

  ngOnInit(): void {
    
    if (localStorage.getItem('Login')=='true')
    {
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
    setTimeout(() => {
      this.ExpireSession();
      
    }, 600000);
  }
  LogIN(event:LoginInfo){
    console.log(this.loginService);
    this.isLoggedIn=event.isLoggedIn;
    this.userInfo=event;
  }
  ExpireSession(){
    localStorage.setItem("Login","");
    this.isLoggedIn=false;
  }
}
