import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginToken } from './models/login-token';
import { User } from './models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  _baseUrl:string = environment.baseUrl + "/user";
  
  constructor(private _http: HttpClient) { }

  login(user: User): Observable<LoginToken> {
    return this._http.post<LoginToken>(this._baseUrl + "/login",user.toJSON());
  }

  register(user: User): Observable<LoginToken> {
    return this._http.post<LoginToken>(this._baseUrl ,user.toJSON());
  }

  update(user: User): Observable<LoginToken> {
    return this._http.patch<LoginToken>(this._baseUrl + "/profile", user.toJSON());
  }
  


}
