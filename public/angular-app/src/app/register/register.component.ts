import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService } from '../user-data.service';
import { User } from '../models/user';
import { LoginToken } from '../models/login-token';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder, 
    private _userService: UserDataService, 
    private _authService: AuthenticationService,
    private _route: Router
    ) { }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.checkPasswords })
  }

  _getUser() {
    let newUser = new User("", "", "", "");
    newUser.fillFromActiveForm(this.registerForm);
    return newUser;
  }
  onSubmit() {
    let newUser = this._getUser();
    this._userService.register(newUser).subscribe({
      next: (loginToken: LoginToken) => {
        this._authService.saveLoginToken(loginToken.token);
        this._route.navigate([""]);
      }
    })

  }


}
