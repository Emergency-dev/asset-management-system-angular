import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<DataTables.Settings> = new Subject();
  userList: UserInfo[]=[];
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
        userActive:item.isactive
      })
      this.userList.push(userInfo);
    });
  }

}
