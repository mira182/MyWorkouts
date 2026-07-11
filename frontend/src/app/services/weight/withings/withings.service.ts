import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, switchMap, take, tap, throwError} from "rxjs";
import {Urls} from "../../../model/urls";
import {WithingsMeasurementModel} from "../../../model/weight/withings-measurement.model";
import {Moment} from "moment";
import {NgxWeightChartService} from "../../rest/chart/weight/ngx/ngx-weight-chart.service";

@Injectable()
export class WithingsService {

  constructor(private readonly http: HttpClient,
              private readonly chartService: NgxWeightChartService) {
  }

  public getWithingsAuthUrl(returnPath?: string): Observable<{ authUrl: string }> {
    const params = returnPath ? new HttpParams().set('state', returnPath) : undefined;
    return this.http.get<{ authUrl: string }>(Urls.API_URL + '/weight/withings/oauth/auth-redirect', {params});
  }

  public updateMeasurements(authorizationCode: string): Observable<any> {
    return this.http.post<any>(Urls.API_URL + '/weight/withings/oauth/exchange', authorizationCode)
      .pipe(
        take(1),
        switchMap(data => {
          if (!data || data.status !== 0) {
            return throwError(() => new Error('Withings token exchange failed'));
          }
          return this.http.post(Urls.API_URL + '/weight/withings/measurements/updateMeasurements', data.body.access_token)
            // Fresh data was imported — drop the cached chart responses.
            .pipe(tap(() => this.chartService.clearCache()));
        })
      );
  }

  public getMeasurements(): Observable<WithingsMeasurementModel[]> {
    return this.http.get<WithingsMeasurementModel[]>(Urls.API_URL + '/weight/withings/measurements/getMeasurements')
  }

  public getMeasurementByDate(date: Moment): Observable<WithingsMeasurementModel[]> {
    let params = new HttpParams().set('date', date.format('dd-MM-yyyy'));
    return this.http.get<WithingsMeasurementModel[]>(Urls.API_URL + '/weight/withings/measurements/getMeasurementByDate', {params})
  }
}
