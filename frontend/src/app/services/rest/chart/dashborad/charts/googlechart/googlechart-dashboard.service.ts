import {Injectable} from '@angular/core';
import {Urls} from '../../../../../../model/urls';
import {HttpClient} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {Moment} from "moment";
import {API_DATE_FORMAT} from "../../../../../../app.config";
import {Row} from "angular-google-charts";

export interface GoogleChartDashboardChartData {
  data: Row[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleChartDashboardService {

  constructor(private readonly http: HttpClient) { }

  public getBreakdownChartData(breakdownChartGroup: string, breakdownChartType: string, startDate: Moment, endDate: Moment): Observable<GoogleChartDashboardChartData> {
    return this.http.get<GoogleChartDashboardChartData>(Urls.API_URL + Urls.DASHBOARD_URL + Urls.GOOGLE_CHART_URL + '/breakdownChartData', {
      params: {
        breakdownChartGroup: breakdownChartGroup,
        breakdownChartType: breakdownChartType,
        startDate: startDate.format(API_DATE_FORMAT),
        endDate:endDate.format(API_DATE_FORMAT),
      }
    })
      .pipe(
        take(1)
      );
  }

}
