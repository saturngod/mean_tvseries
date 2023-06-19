export class LoginToken {
    #token!:string;
    get token() { return this.#token;}
    set token(token: string) { this.#token = token;}
}