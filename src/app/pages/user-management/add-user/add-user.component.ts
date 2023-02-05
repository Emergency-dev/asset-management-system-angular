import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UserInfo } from 'src/app/models/user-info.model';
import { DataService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() finishEvent = new EventEmitter<any>();


  @ViewChild("cust_fname") cust_fname: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_lname") cust_lname: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_uname") cust_uname: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_pass") cust_pass: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_conpass") cust_conpass: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_admin") cust_admin: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_active") cust_active: ElementRef<HTMLInputElement> = {} as ElementRef;
  user:UserInfo=new UserInfo();

  constructor(protected dataService: DataService) { }

  ngOnInit(): void {
  }
  Validations():boolean{
    if(this.cust_fname.nativeElement.value==''||
    this.cust_lname.nativeElement.value==''|| 
    (this.cust_uname.nativeElement.value=='')||
    this.cust_pass.nativeElement.value==''||this.cust_conpass.nativeElement.value=='' )
    {
      alert("Wrong Information!")
      return false;
    }
    else if(this.cust_uname.nativeElement.value.length<=2)
    {
      alert('User Name Must be greater than 2 characters')
      return false;
    }
    else if(this.cust_pass.nativeElement.value!=this.cust_conpass.nativeElement.value){
      alert('Confirm Password is Incorrect')
      return false;
    }
    else if(this.cust_pass.nativeElement.value.length<7){
      alert('Password should be greater than 8 characters')
      return false;
    }
    else{
      return true
    }
  }
  addUser(){
    if(this.Validations()){
      this.dataService.InsertUsers(
        this.cust_uname.nativeElement.value,
        this.cust_fname.nativeElement.value,
        this.cust_lname.nativeElement.value,
        this.cust_pass.nativeElement.value,
        this.cust_active.nativeElement.checked,
        this.cust_admin.nativeElement.checked
      );
    this.finishEvent.emit()
    }
    // this.user.firstName=this.cust_fname.nativeElement.value;
    // this.user.lastName=this.cust_lname.nativeElement.value;
    // this.user.username=this.cust_uname.nativeElement.value;
    // //this.user.pas=this.cust_fname.nativeElement.value;
    // this.user.firstName=this.cust_fname.nativeElement.value;
    // this.user.userActive= this.cust_active.nativeElement.checked;
    // this.user.userAdmin=this.cust_admin.nativeElement.checked;
    //alert(this.cust_active.nativeElement.value)
  }

}
