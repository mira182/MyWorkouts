import {Injectable} from '@angular/core';
import {Moment} from "moment/moment";
import {Observable} from "rxjs";
import {Urls} from "../../../../../../model/urls";
import {API_DATE_FORMAT} from "../../../../../../app.config";
import {HttpClient} from "@angular/common/http";

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
        startDate: startDate.format(API_DATE_FORMAT),
        endDate:endDate.format(API_DATE_FORMAT),
      }
    });
  }

  public getWorkoutChartData(workoutChartType: string, startDate: Moment, endDate: Moment): Observable<ChartJsData> {
    return this.http.get<ChartJsData>(Urls.API_URL + Urls.DASHBOARD_URL + Urls.CHART_JS_URL + '/workoutChartData', {
      params: {
        workoutChartType: workoutChartType,
        startDate: startDate.format(API_DATE_FORMAT),
        endDate:endDate.format(API_DATE_FORMAT),
      }
    });
  }

  public getWorkoutExerciseChartData(workoutExerciseChartType: string, exerciseName: string, startDate: Moment, endDate: Moment): Observable<ChartJsData> {
    return this.http.get<ChartJsData>(Urls.API_URL + Urls.DASHBOARD_URL + Urls.CHART_JS_URL + '/workoutExerciseChartData', {
      params: {
        exerciseName: exerciseName,
        workoutExerciseChartType: workoutExerciseChartType,
        startDate: startDate.format(API_DATE_FORMAT),
        endDate:endDate.format(API_DATE_FORMAT),
      }
    });
  }
}
