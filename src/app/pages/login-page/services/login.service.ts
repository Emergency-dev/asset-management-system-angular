import { Injectable } from '@angular/core';
import { LoginInfo } from 'src/app/models/login-info';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginInfo:LoginInfo = new LoginInfo();

  constructor() { }
}
