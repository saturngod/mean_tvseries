import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _jwt: JwtHelperService) { }

  get isLogin() {
    if(null == localStorage.getItem("_token")) {
      return false;
    }
    
    return true;
  }

  isTokenExpired(token: string) {
    return this._jwt.isTokenExpired(token);
  }
  

  saveLoginToken(token: string) {
    localStorage.setItem("_token",token);
  }

  logout() {
    localStorage.clear();
  }

  get token(): string {
    return localStorage.getItem("_token") as string;
  }

  get name(): string {
    return this._jwt.decodeToken(this.token).name as string;
  }

  get username(): string {
    return this._jwt.decodeToken(this.token).username as string;
  }



}
