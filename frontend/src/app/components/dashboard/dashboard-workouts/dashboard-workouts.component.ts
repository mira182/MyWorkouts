import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {Interval} from "../../../model/time/interval";
import moment from 'moment';
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ChipsTimeSelectComponent} from "../chips-time-select/chips-time-select.component";
import {MatSelectModule} from "@angular/material/select";
import {CookieModule, CookieService} from "ngx-cookie";
import {ChartTypeRegistry} from "chart.js";
import {
  ChartJsDashboardService
} from "../../../services/rest/chart/dashborad/charts/chartjs/chart-js-dashboard.service";
import {finalize, take} from "rxjs";
import {isNil} from "lodash";
import {createWorkoutChartConfig} from "../../../model/charts/configuration/create-chart.config";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

export class WorkoutChartType {
  value: string;
  viewValue: string;
}

export class WorkoutChart {
  groupName: string;
  charts: WorkoutChartType[];
}

export interface WorkoutChartSettings {
  axisYsuffix?: string;
  yValueFormatString?: string;
  interval?: number;
  chartType?: keyof ChartTypeRegistry;
}

@Component({
  selector: 'app-dashboard-workouts',
  templateUrl: './dashboard-workouts.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinner,
    ChipsTimeSelectComponent,
    MatSelectModule,
    CookieModule,
    NgxSpinnerModule
  ],
})
export class DashboardWorkoutsComponent implements OnInit {

  readonly COOKIE_NAME = 'workout-chart-filter';

  protected workoutGroups: WorkoutChart[] = [
    {
      groupName: 'WORKOUT CHARTS',
      charts: [
        {value: 'VOLUME_PER_WORKOUT', viewValue: 'Volume Per Workout'},
        {value: 'SETS_PER_WORKOUT', viewValue: 'Sets Per Workout'},
        {value: 'REPS_PER_WORKOUT', viewValue: 'Reps Per Workout'}
      ]
    },
    {
      groupName: 'WEEKLY CHARTS',
      charts: [
        {value: 'WORKOUTS_PER_WEEK', viewValue: 'Workouts Per Week'},
        {value: 'VOLUME_PER_WEEK', viewValue: 'Volume Per Week'},
        {value: 'SETS_PER_WEEK', viewValue: 'Sets Per Week'},
        {value: 'REPS_PER_WEEK', viewValue: 'Reps Per Week'}
      ]
    },
    {
      groupName: 'MONTHLY CHARTS',
      charts: [
        {value: 'WORKOUTS_PER_MONTH', viewValue: 'Workouts Per Month'},
        {value: 'VOLUME_PER_MONTH', viewValue: 'Volume Per Month'},
        {value: 'SETS_PER_MONTH', viewValue: 'Sets Per Month'},
        {value: 'REPS_PER_MONTH', viewValue: 'Reps Per Month'}
      ]
    }
  ];

  protected selectWorkoutControl = new FormControl(this.workoutGroups[0].charts[0]);

  protected currentInterval: Interval;

  protected chart;

  constructor(private readonly chartJsDashboardService: ChartJsDashboardService,
              private readonly cookieService: CookieService,
              private readonly spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.currentInterval = {
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
    };

    const workoutChartFilterCookie : any = this.cookieService.getObject(this.COOKIE_NAME)
    if (workoutChartFilterCookie) {
      this.currentInterval = {
        startDate: moment(workoutChartFilterCookie.interval.startDate),
        endDate: moment(workoutChartFilterCookie.interval.endDate),
      };
      this.selectWorkoutControl.setValue(workoutChartFilterCookie.chartType)
    }

    this.updateChart(this.currentInterval);
  }

  compareChartTypes(o1: any, o2: any): boolean {
    return o1.value === o2.value && o1.viewValue === o2.viewValue;
  }

  protected updateMonthInterval(monthInterval: Interval) {
    this.currentInterval = monthInterval;
    this.updateChart(this.currentInterval);
  }

  protected updateChart(interval: Interval) {
    this.cookieService.putObject(this.COOKIE_NAME, {
      interval: interval,
      chartType: this.selectWorkoutControl.value
    });

    this.getWorkoutChartData();
  }

  private getWorkoutChartData(): void {
    this.spinnerService.show();

    this.chartJsDashboardService.getWorkoutChartData(this.selectWorkoutControl.value.value, this.currentInterval.startDate, this.currentInterval.endDate)
      .pipe(
        finalize(() => this.spinnerService.hide()),
        take(1)
      )
      .subscribe(data => {
        if (!isNil(this.chart)) {
          this.chart.destroy();
        }

        this.chart = createWorkoutChartConfig(
          data.data.map(point => moment(point.key).format('DD-MM-YYYY')),
          data.data.map(point => point.value),
          this.getSettingsOfChart()
        );
      });
  }

  private getSettingsOfChart() {
    let axisYsuffix = '';
    let yValueFormatString = '';
    let interval = 1;
    let chartType: keyof ChartTypeRegistry = 'line';
    switch (this.selectWorkoutControl.value) {
      case this.workoutGroups[0].charts[0]: // Volume Per Workout
        axisYsuffix = ' kg';
        yValueFormatString = '0 kg';
        interval = 7;
        break;
      case this.workoutGroups[1].charts[1]: // Volume Per Week
        axisYsuffix = ' kg';
        yValueFormatString = '0 kg';
        interval = 7;
        chartType = 'line';
        break;
      case this.workoutGroups[2].charts[1]: // Volume Per Month
        axisYsuffix = ' kg';
        yValueFormatString = '0 kg';
        chartType = 'bar';
        break;
      case this.workoutGroups[0].charts[1]: // Sets Per Workout
        axisYsuffix = ' sets';
        yValueFormatString = '0 sets';
        break;
      case this.workoutGroups[1].charts[2]: // Sets Per Week
        axisYsuffix = ' sets';
        yValueFormatString = '0 sets';
        chartType = 'bar';
        break;
      case this.workoutGroups[2].charts[2]: // Sets Per Month
        axisYsuffix = ' sets';
        yValueFormatString = '0 sets';
        chartType = 'bar';
        break;
      case this.workoutGroups[0].charts[2]: // Reps Per Workout
        axisYsuffix = ' reps';
        yValueFormatString = '0 reps';
        break;
      case this.workoutGroups[1].charts[3]: // Reps Per Week
        axisYsuffix = ' reps';
        yValueFormatString = '0 reps';
        chartType = 'bar';
        break;
      case this.workoutGroups[2].charts[3]: // Reps Per Month
        axisYsuffix = ' reps';
        yValueFormatString = '0 reps';
        chartType = 'bar';
        break;
      case this.workoutGroups[1].charts[0]: // Workouts Per Week
        axisYsuffix = ' workouts';
        yValueFormatString = '0 workouts';
        interval = 7;
        chartType = 'bar';
        break;
      case this.workoutGroups[2].charts[0]: // Workouts Per Month
        axisYsuffix = ' workouts';
        yValueFormatString = '0 workouts';
        chartType = 'bar';
        break;
    }
    return {
      axisYsuffix: axisYsuffix,
      yValueFormatString: yValueFormatString,
      interval: interval,
      chartType: chartType
    }
  }
}
