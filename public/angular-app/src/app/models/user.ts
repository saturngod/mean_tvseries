import { FormGroup } from "@angular/forms";

export class User {
    #name!: string;
    #username!: string;
    #password!: string;
    #newPassword!: string;

    set name(name: string) {this.#name= name; }
    get name() {return this.#name; }

    set username(username: string) {this.#username= username}
    get username() {return this.#username; }

    set password(password: string) {this.#password= password}
    get password() { return this.#password; }

    set newPassword(newPassword: string) { this.#newPassword = newPassword;}
    get newPassword() { return this.#newPassword; }


    constructor(name: string,username: string, password: string, newpassword: string) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.newPassword= newpassword;
    }

    toJSON() {
        return {
            "name": this.name,
            "username": this.username,
            "password": this.password,
            "newPassword": this.newPassword
        };
    }

    fillFromActiveForm(formGroup: FormGroup) {
        this.username = formGroup.value.username;
        this.name = formGroup.value.name;
        this.password = formGroup.value.password;
    }

}