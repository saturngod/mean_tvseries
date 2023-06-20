import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  query:string = "";

  get isLogin() {
    return this._authService.isLogin;
  }
  
  constructor(private _authService: AuthenticationService, 
    private _activatedRoute: ActivatedRoute,
    private _route: Router) {

  }

  _updateSearchQuery(value: Params) {
    this.query = value["q"];
  }
  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe({
        next: (value: Params) => this._updateSearchQuery(value)
    });
  }

  search(form:NgForm) {
    
    if(this.query.trim() != "") {
      this._route.navigate(["search"], {queryParams: {q:this.query.trim()}})
    }
  }

  logout() {
    this._authService.logout();
    this._route.navigate([""]);
  }
}
