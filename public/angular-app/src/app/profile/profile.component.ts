import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { UserDataService } from '../user-data.service';
import { User } from '../models/user';
import { LoginToken } from '../models/login-token';


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
      this.errorMessage = "New Password is required";
      return false;
    }
    else if(this.profileForm.value.newPassword != this.profileForm.value.confirmPassword) {
      this.errorMessage = "New Password and Confirm password must same";
      return false;
    }
    return true;
  }

  _usernameFormChecking(): boolean {
    if(this.profileForm.value.name == "") {
      this.errorMessage = "Name cannot be empty";
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
        this.successMessage = "Success";
        this.errorMessage = "";
      },
      error: () => {
        this.successMessage = "";
        this.errorMessage = "Something Wrong! Cannot update the profile";
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


