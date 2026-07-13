import {Injectable} from '@angular/core';
import {Moment} from "moment/moment";
import {Observable} from "rxjs";
import {Urls} from "../../../../../../model/urls";
import {HttpClient} from "@angular/common/http";
import {DATE_FORMATS} from "../../../../../../config/date-formats";

export interface ChartJsData {
  data: ChartJsDataPoint[];
}

export interface ChartJsDataPoint {
  key: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChartJsDashboardService {

  constructor(private readonly http: HttpClient) { }

  public getBreakdownChartData(breakdownChartGroup: string, breakdownChartType: string, startDate: Moment, endDate: Moment): Observable<ChartJsData> {
    return this.http.get<ChartJsData>(Urls.API_URL + Urls.DASHBOARD_URL + Urls.CHART_JS_URL + '/breakdownChartData', {
      params: {
        breakdownChartGroup: breakdownChartGroup,
        breakdownChartType: breakdownChartType,
        startDate: startDate.format(DATE_FORMATS.apiDate),
        endDate:endDate.format(DATE_FORMATS.apiDate),
      }
    });
  }

  public getWorkoutChartData(workoutChartType: string, startDate: Moment, endDate: Moment): Observable<ChartJsData> {
    return this.http.get<ChartJsData>(Urls.API_URL + Urls.DASHBOARD_URL + Urls.CHART_JS_URL + '/workoutChartData', {
      params: {
        workoutChartType: workoutChartType,
        startDate: startDate.format(DATE_FORMATS.apiDate),
        endDate:endDate.format(DATE_FORMATS.apiDate),
      }
    });
  }

  public getWorkoutExerciseChartData(workoutExerciseChartType: string, exerciseName: string, startDate: Moment, endDate: Moment): Observable<ChartJsData> {
    return this.http.get<ChartJsData>(Urls.API_URL + Urls.DASHBOARD_URL + Urls.CHART_JS_URL + '/workoutExerciseChartData', {
      params: {
        exerciseName: exerciseName,
        workoutExerciseChartType: workoutExerciseChartType,
        startDate: startDate.format(DATE_FORMATS.apiDate),
        endDate:endDate.format(DATE_FORMATS.apiDate),
      }
    });
  }
}
