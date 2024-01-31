import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Urls} from "../../../model/urls";
import {WithingsMeasurementModel} from "../../../model/weight/withings-measurement.model";
import {SnackBarService} from "../../snack-bar/snack-bar.service";
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs";
import {Moment} from "moment";

@Injectable()
export class WithingsService {

  public static REDIRECT_URI = Urls.LOCAL_URL + '/weight';

  public static GET_TOKEN_URL = 'https://wbsapi.withings.net/v2/oauth2';

  public static GET_CODE_URL = 'https://account.withings.com/oauth2_user/authorize2';

  public static CLIENT_ID = '19b6af069d59c78fbd5527878afc2253fbe8a6bc3b829d7a685fbf42ea09b162';

  public static CLIENT_SECRET = '6ca19742a74c896b8ae1625e862c5ac6bb7364cd1ca3a9ef554de9154f450b5a';

  constructor(private readonly http: HttpClient,
              private readonly snackBarService: SnackBarService,
              private readonly translate: TranslateService) {
  }

  public saveMeasurements(authorizationCode: string): void {

    const body = {
      action: "requesttoken",
      client_id: WithingsService.CLIENT_ID,
      client_secret: WithingsService.CLIENT_SECRET,
      grant_type: "authorization_code",
      code: authorizationCode,
      redirect_uri: WithingsService.REDIRECT_URI
    }

    this.http.post<any>(WithingsService.GET_TOKEN_URL, body)
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
