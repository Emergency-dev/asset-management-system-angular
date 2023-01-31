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
  constructor(protected dataService: DataService) { }

  ngOnInit(): void {
  }
  async getUserData(){
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