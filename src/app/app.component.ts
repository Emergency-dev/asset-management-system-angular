import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'asset-management-system';
  isLoggedIn=false;
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('Login')=='true')
    {
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
  }
  LogIN(event:any){
    this.isLoggedIn=event;
  }
}
