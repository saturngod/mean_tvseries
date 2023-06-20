import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { AuthenticationService } from '../authentication.service';
import { LoginToken } from '../models/login-token';
import { UserDataService } from '../user-data.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:string = "";
  password:string = "";
  message: string = "";
  

  get name() { return this._authService.name}

  get isLogin() { return this._authService.isLogin}

  constructor(private _authService: AuthenticationService,
    private _userService: UserDataService,
    private _route: Router) {

  }

  login(form:NgForm) {
    const loginUser = new User("",this.username,this.password,"");
    this._userService.login(loginUser).subscribe({
      next:(loginResponse: LoginToken) => {
       this._authService.saveLoginToken(loginResponse.token);
        this._route.navigate([""]);
      },
      error: () => {
        this._authService.logout();
        this.message= environment.MESSAGE_INVALID_LOGIN;
      },
      complete: () => {

      }
    })
  }

  logout() {
    this._authService.logout();
  }

}
