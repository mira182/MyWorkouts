import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Urls} from "../../../model/urls";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImage(pictureId : number) : Observable<Blob> {
    return this.http.get(Urls.API_URL + '/images/get-image?pictureId=' + pictureId, {responseType: 'blob'});
  }
}
