import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { UserDataService } from '../user-data.service';
import { User } from '../models/user';
import { LoginToken } from '../models/login-token';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  errorMessage: string = ""
  successMessage: string = ""

  get welcomeName() { return this._authService.name; }


  
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthenticationService,
    private _userServie: UserDataService) { }

  ngOnInit(): void {

    this.profileForm = this._formBuilder.group({
      name: this._authService.name,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
  }

  _passwordFormChecking(): boolean {
    if(this.profileForm.value.newPassword == "") {
      this.errorMessage = environment.MESSAGE_NEW_PASSWORD_REQUIRED;
      return false;
    }
    else if(this.profileForm.value.newPassword != this.profileForm.value.confirmPassword) {
      this.errorMessage = environment.MESSAGE_NEW_PASSWORD_CONFIRM_SAME;
      return false;
    }
    return true;
  }

  _usernameFormChecking(): boolean {
    if(this.profileForm.value.name == "") {
      this.errorMessage = environment.MESSAGE_NAME_NOT_EMPTY;
      return false;
    }
    return true;
  }

  _getUpdateProfileData(name: string,currentPassword: string,newPassword: string) {
    let updateProfile = {};
    if(currentPassword !="" && name != "") {
      updateProfile = {
        name: name,
        currentPassword: currentPassword,
        newPassword: newPassword
      }
    }
    else if(currentPassword !="" && name == "") {
      updateProfile = {
        currentPassword: currentPassword,
        newPassword: newPassword
      }
    }
    else if(currentPassword == "" && name != "") {
      updateProfile = {
        name: name
      }
    }
    
    return updateProfile;
  }
  _submitForm(name: string,currentPassword: string,newPassword: string) {
    const user = new User(name, "",currentPassword,newPassword);
    this._userServie.update(user).subscribe({
      next: (loginToken:LoginToken) => {
        this._authService.saveLoginToken(loginToken.token);
        this.successMessage = environment.MESSAGE_SUCCESS;
        this.errorMessage = "";
      },
      error: () => {
        this.successMessage = "";
        this.errorMessage = environment.MESSAGE_SOMETHING_WRONG_UPDATGE_PROFILE;
      }
    })
  }

  onSubmit() {
    if(this.profileForm.value.currentPassword != "") {
      //update current password
      let passwordCheckingValid = this._passwordFormChecking();
      if(passwordCheckingValid) {
        this._submitForm(this.profileForm.value.name,
          this.profileForm.value.currentPassword,
          this.profileForm.value.newPassword);
      }
      
    }
    else if(this.profileForm.value.name != this.welcomeName){
      let usernameFormChecking = this._usernameFormChecking();
      if(usernameFormChecking) {
        this._submitForm(this.profileForm.value.name,"","");
      }
    }
  }
}


