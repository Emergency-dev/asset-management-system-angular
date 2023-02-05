import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Output() finishEvent = new EventEmitter<any>();
  
  @ViewChild("uName") uName: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("pass") pass: ElementRef<HTMLInputElement> = {} as ElementRef;

  isLoggedIn=false;
  alert=false;
  public showPassword: boolean=false;
  public showPasswordOnPress: boolean=false;
  constructor(protected dataService: DataService) { }

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
        this.alert=false
        options?.map((item) => {
          if(item)
          {
          }      
          
        })
      }
      else{
        localStorage.setItem("Login","false");
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
      this.finishEvent.emit(this.isLoggedIn);
      
    }, 1);
  }

}
