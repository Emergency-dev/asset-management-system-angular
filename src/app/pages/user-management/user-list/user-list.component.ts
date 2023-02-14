import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserInfo } from 'src/app/models/user-info.model';
import { DataService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild("cust_fname") cust_fname: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_lname") cust_lname: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_uname") cust_uname: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_pass") cust_pass: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_conpass") cust_conpass: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_admin") cust_admin: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild("cust_active") cust_active: ElementRef<HTMLInputElement> = {} as ElementRef;

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<DataTables.Settings> = new Subject();
  userList: UserInfo[]=[];
  selectedUser: UserInfo=new UserInfo();
  isUpdatePageModalOpen:boolean=false;
  constructor(protected dataService: DataService) { }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false,
      searching: false
    }
    this.GetAllUsers();
  }
  async GetAllUsers(){
    const cusOptions = await (await this.dataService.GetUsers()).data;
    cusOptions?.map((item) => {
      let userInfo = new UserInfo();
      userInfo = ({
        userId: item.userid,
        firstName:item.firstname,
        lastName:item.lastname,
        userImageUrl:"",
        username:item.username,
        userType:'',
        userAdmin:item.isadmin,
        userActive:item.isactive,
        password:''
      })
      this.userList.push(userInfo);
    });
  }
  async GetSelectedUsers(id:any){
    const cusOptions = await (await this.dataService.SelectUsers(id)).data;
    cusOptions?.map((item) => {
      let userInfo = new UserInfo();
      userInfo = ({
        userId: item.userid,
        firstName:item.firstname,
        lastName:item.lastname,
        userImageUrl:"",
        username:item.username,
        userType:'',
        userAdmin:item.isadmin,
        userActive:item.isactive,
        password:item.password
      })
      this.selectedUser=userInfo;
      setTimeout(() => {
        this.setValue();
      }, 1);
    });
  }
  selectUser(id:any){
    this.isUpdatePageModalOpen=true;
    this.GetSelectedUsers(id);
  }
  setValue(){
    this.cust_uname.nativeElement.value = this.selectedUser.username;
    this.cust_fname.nativeElement.value = this.selectedUser.firstName;
    this.cust_lname.nativeElement.value = this.selectedUser.lastName;
    this.cust_pass.nativeElement.value = this.selectedUser.password;
    this.cust_active.nativeElement.checked = this.selectedUser.userActive;
    this.cust_admin.nativeElement.checked = this.selectedUser.userAdmin;
    this.cust_conpass.nativeElement.value = this.selectedUser.password;
  }
  onUpdatePageClose(){
    this.selectedUser=new UserInfo();
    this.isUpdatePageModalOpen=false;
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
  updateUser(){
    if(this.Validations()){
      this.dataService.UpdateUsers(
        this.selectedUser.userId,
        this.cust_uname.nativeElement.value,
        this.cust_fname.nativeElement.value,
        this.cust_lname.nativeElement.value,
        this.cust_pass.nativeElement.value,
        this.cust_active.nativeElement.checked,
        this.cust_admin.nativeElement.checked
      );
      this.isUpdatePageModalOpen=false;
      alert("User Updated!")
    }
  }
}
