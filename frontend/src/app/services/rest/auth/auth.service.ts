import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {Urls} from "../../../model/urls";
import {UserService} from "../user/user.service";
import {map} from "rxjs/operators";

const AUTHENTICATE_URL = '/users/authenticate';

@Injectable()
export class AuthService {

  private loggedIn: boolean = false;

  constructor(private http: HttpClient,
              private tokenSevice: TokenService) {
  }

  login(username: string, password: string) {
    return this.http.post<any>(Urls.API_URL + AUTHENTICATE_URL, {username: username, password: password})
      .pipe(map(user => {
        if (user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.tokenSevice.saveToken(user.token);
          // login successful if there's a jwt token in the response
          UserService.setCurrentUser(user);
          this.loggedIn = true;
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.tokenSevice.removeToken();
    UserService.removeCurrentUser();
    this.loggedIn = false;
  }
}
