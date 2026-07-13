import {Injectable} from '@angular/core';
import {Urls} from '../../../../../../model/urls';
import {HttpClient} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {Moment} from "moment";
import {NgxDataPoint} from "../../../../../../components/weight/model/ngx-chart-data-model";
import {DATE_FORMATS} from "../../../../../../config/date-formats";

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
        startDate: startDate.format(DATE_FORMATS.apiDate),
        endDate:endDate.format(DATE_FORMATS.apiDate),
      }
    })
      .pipe(
        take(1)
      );
  }

  public getTotalsChartData(startDate: Moment, endDate: Moment): Observable<NgxDashboardChartData> {
    return this.http.get<NgxDashboardChartData>(Urls.API_URL + Urls.DASHBOARD_URL + Urls.NGX_URL + '/totalsChartData', {
      params: {
        startDate: startDate.format(DATE_FORMATS.apiDate),
        endDate:endDate.format(DATE_FORMATS.apiDate),
      }
    })
      .pipe(
        take(1)
      );
  }

}
