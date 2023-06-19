import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get isLogin() {
    return this._authService.isLogin;
  }
  
  constructor(private _authService: AuthenticationService, private _route: Router) {

  }

  logout() {
    this._authService.logout();
    this._route.navigate([""]);
  }
}
