import {Injectable} from "@angular/core";
import {Observable, take} from "rxjs";
import {Urls} from "../../../../../model/urls";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private readonly http: HttpClient) {
  }

  public getAllBreakdownChartTypes(): Observable<string[]> {
    return this.http.get<string[]>(Urls.API_URL + Urls.CHARTS_URL + '/breakdownChartTypes')
      .pipe(
        take(1)
      );
  }

  public getAllBreakdownChartGroups(): Observable<string[]> {
    return this.http.get<string[]>(Urls.API_URL + Urls.CHARTS_URL + '/breakdownChartGroups')
      .pipe(
        take(1)
      );
  }
}
