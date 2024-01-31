import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {Urls} from "../../../model/urls";
import {UserService} from "../user/user.service";
import {map} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";

const AUTHENTICATE_URL = '/users/authenticate';

export interface LoginUser {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  public login(user: LoginUser) {
    return this.http.post<any>(Urls.API_URL + AUTHENTICATE_URL, user)
      .pipe(map(user => {
        if (user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.tokenService.saveToken(user.token);
          // login successful if there's a jwt token in the response
          UserService.setCurrentUser(user);
          this.loggedIn.next(true);
        }
      }));
  }

  public logout() {
    // remove user from local storage to log user out
    this.tokenService.removeToken();
    UserService.removeCurrentUser();
    this.loggedIn.next(false);
  }

  public get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
