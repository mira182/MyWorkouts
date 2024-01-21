import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Urls} from "../../../model/urls";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExportImportService {

  constructor(private http: HttpClient) { }

  public export(): Observable<boolean> {
    return this.http.get<boolean>(Urls.API_URL + "/export");
  }

  public importLatest(): Observable<boolean> {
    return this.http.get<boolean>(Urls.API_URL + "/import");
  }

  public importFromFolder(folderName: string) {
    return this.http.get<boolean>(Urls.API_URL + "/import/" + folderName);
  }

  public getExportFolderNames(): Observable<string[]> {
    return this.http.get<string[]>(Urls.API_URL + "/export/folders");
  }
}
