import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../../../model/user/user";
import {Urls} from "../../../model/urls";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(Urls.API_URL + `/users`);
  }

  getById(id: number) {
    return this.http.get<User>(Urls.API_URL + `/users/` + id);
  }

  register(user: User) {
    return this.http.post(Urls.API_URL + `/users/register`, user);
  }

  update(user: User) {
    return this.http.put<User>(Urls.API_URL + `/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(Urls.API_URL + `/users/` + id);
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  static setCurrentUser(user : User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  static removeCurrentUser() {
    localStorage.removeItem('currentUser');
  }
}
