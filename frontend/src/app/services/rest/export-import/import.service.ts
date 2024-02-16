import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Urls} from "../../../model/urls";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(private http: HttpClient) { }

  public importLatest(): Observable<boolean> {
    return this.http.get<boolean>(Urls.API_URL + "/import");
  }
}
