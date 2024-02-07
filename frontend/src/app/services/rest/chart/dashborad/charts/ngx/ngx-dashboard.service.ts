import {Injectable} from '@angular/core';
import {Urls} from '../../../../../../model/urls';
import {HttpClient} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {Moment} from "moment";
import {API_DATE_FORMAT} from "../../../../../../app.config";
import {NgxDataPoint} from "../../../weight/ngx/ngx-weight-chart.service";

export interface NgxDashboardChartData {
  data: NgxDataPoint[];
}

@Injectable({
  providedIn: 'root'
})
export class NgxDashboardService {

  constructor(private http: HttpClient) { }

  public getBreakdownChartData(breakdownChartGroup: string, breakdownChartType: string, startDate: Moment, endDate: Moment): Observable<NgxDashboardChartData> {
    return this.http.get<NgxDashboardChartData>(Urls.API_URL + Urls.DASHBOARD_URL + Urls.NGX_URL + '/breakdownChartData', {
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

  public getTotalsChartData(startDate: Moment, endDate: Moment): Observable<NgxDashboardChartData> {
    return this.http.get<NgxDashboardChartData>(Urls.API_URL + Urls.DASHBOARD_URL + Urls.NGX_URL + '/totalsChartData', {
      params: {
        startDate: startDate.format(API_DATE_FORMAT),
        endDate:endDate.format(API_DATE_FORMAT),
      }
    })
      .pipe(
        take(1)
      );
  }

}
