import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LoginInfo } from 'src/app/models/login-info';
import { DataService } from 'src/app/services/supabase.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [LoginService]
})
export class LoginPageComponent implements OnInit {
  @Output() finishEvent = new EventEmitter<any>();
  
  @ViewChild("uName") uName: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("pass") pass: ElementRef<HTMLInputElement> = {} as ElementRef;

  isLoggedIn=false;
  alert=false;
  public showPassword: boolean=false;
  public showPasswordOnPress: boolean=false;
  constructor(protected dataService: DataService, protected loginService: LoginService) { }

  ngOnInit(): void {
  }
  async getUserData(){
    if(this.uName.nativeElement.value==''||this.pass.nativeElement.value==''){
      this.alert=true;
      this.uName.nativeElement.required;
      setTimeout(() => {
        this.alert=false;        
      }, 3000);
    }
    else{
      const options = await (await this.dataService.userLogIn(this.uName.nativeElement.value,this.pass.nativeElement.value)).data;
      if(options?.length!=0){
        localStorage.setItem("Login","true");
        this.loginService.loginInfo.isLoggedIn=true;
        this.alert=false
        options?.map((item) => {
          this.loginService.loginInfo.userInfo.userId=item.userid;
          this.loginService.loginInfo.userInfo.username=item.username;
          this.loginService.loginInfo.userInfo.firstName=item.firstname;
          this.loginService.loginInfo.userInfo.lastName=item.lastname;
          this.loginService.loginInfo.userInfo.userActive=item.isactive;
          this.loginService.loginInfo.userInfo.userAdmin=item.isadmin;
          if(item.isadmin)
          {
            localStorage.setItem("Admin","true");
          }      
          else{
            localStorage.setItem("Admin","false");
          }
        })
      }
      else{
        localStorage.setItem("Login","false");
        this.loginService.loginInfo.isLoggedIn=false;
        this.alert=true;
        this.uName.nativeElement.required;
        setTimeout(() => {
          this.alert=false;
          
      }, 3000);
    }
  }
    this.LogIN();
}
  LogIN(){
    //this.getUserData();
    setTimeout(() => {
      if(localStorage.getItem('Login')=='true'){
        this.isLoggedIn=true;
      }
      else{
        this.isLoggedIn=false;        
      }
      console.log(this.loginService.loginInfo);
      this.finishEvent.emit(this.loginService.loginInfo);
    }, 1);
  }

}
