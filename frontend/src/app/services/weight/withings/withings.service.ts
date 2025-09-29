import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Urls} from "../../../model/urls";
import {WithingsMeasurementModel} from "../../../model/weight/withings-measurement.model";
import {SnackBarService} from "../../snack-bar/snack-bar.service";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs";
import {Moment} from "moment";
import {environment} from "../../../../environments/environment";

@Injectable()
export class WithingsService {

  constructor(private readonly http: HttpClient,
              private readonly snackBarService: SnackBarService,
              private readonly translate: TranslateService) {
  }

  public redirectToWithingsAuthUrl(): void {
    this.http.get<{authUrl: string}>(Urls.API_URL + '/weight/withings/oauth/auth-redirect')
      .subscribe(response => {
        if (response && response.authUrl) {
          window.location.href = response.authUrl;
        }
      })
  }

  public saveMeasurements(authorizationCode: string): void {

    const body = {
      code: authorizationCode
    }

    this.http.post<any>(Urls.API_URL + '/weight/withings/oauth/exchange', body)
      .pipe(
        take(1),
      )
      .subscribe(data => {
      if (data && data.status === 0) {
        this.http.post(Urls.API_URL + '/weight/withings/measurements/saveMeasurements', data.body.access_token).subscribe(res => {
          if (res) {
            this.snackBarService.showSuccessSnackBar(this.translate.instant("ALERT.successfully-saved"));
          }
        });
      }
    });
  }

  public getMeasurements() : Observable<WithingsMeasurementModel[]> {
    return this.http.get<WithingsMeasurementModel[]>(Urls.API_URL + '/weight/withings/getMeasurements')
  }

  public getMeasurementByDate(date: Moment) : Observable<WithingsMeasurementModel[]> {
    let params = new HttpParams().set('date', date.format('dd-MM-yyyy'));
    return this.http.get<WithingsMeasurementModel[]>(Urls.API_URL + '/weight/withings/getMeasurementByDate', { params })
  }
}
