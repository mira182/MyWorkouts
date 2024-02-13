import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../../model/exercise/exercise";
import {TranslateModule} from "@ngx-translate/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Interval} from "../../../model/time/interval";
import {CookieService} from "ngx-cookie";
import {ChipsTimeSelectComponent} from "../chips-time-select/chips-time-select.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import moment from "moment";
import {WorkoutChartSettings} from "../dashboard-workouts/dashboard-workouts.component";
import {Chart} from "chart.js";
import {filter, take} from "rxjs";
import {
  ChartJsDashboardService
} from "../../../services/rest/chart/dashborad/charts/chartjs/chart-js-dashboard.service";
import {createWorkoutExerciseChartConfig} from "../../../model/charts/configuration/create-chart.config";
import {isNil} from "lodash";
import {NgxSpinnerModule} from "ngx-spinner";
import {DialogsHandlerService} from "../../../services/dialogs-handler/dialogs-handler.service";

@Component({
  selector: 'app-dashboard-exercises',
  templateUrl: './dashboard-exercises.component.html',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    ChipsTimeSelectComponent,
    MatButton,
    MatLabel,
    NgxSpinnerModule
  ],
  standalone: true
})
export class DashboardExercisesComponent implements OnInit {

  readonly COOKIE_NAME = 'exercise-chart-filter';

  protected selectedExercise: Exercise;

  exerciseChartType = [
    {value: "MAX_WEIGHT", text: "Max Weight"},
    {value: "MAX_REPS", text: "Max Reps"},
    {value: "MAX_VOLUME", text: "Max Volume"},
    {value: "WORKOUT_VOLUME", text: "Workout Volume"},
    {value: "WORKOUT_REPS", text: "Workout Reps"}
  ];

  selectedChartTypeControl = new FormControl(this.exerciseChartType[0].value);

  protected currentInterval: Interval;

  protected chart: Chart;

  constructor(private readonly dialogsHandlerService: DialogsHandlerService,
              private readonly cookieService: CookieService,
              private readonly chartJsDashboardService: ChartJsDashboardService) { }

  public ngOnInit(): void {
    this.currentInterval = {
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    }

    const exerciseChartFilterCookie : any = this.cookieService.getObject(this.COOKIE_NAME)

    if (exerciseChartFilterCookie) {
      this.currentInterval = {
        startDate: moment(exerciseChartFilterCookie.interval.startDate),
        endDate: moment(exerciseChartFilterCookie.interval.endDate),
      };
      this.selectedExercise = exerciseChartFilterCookie.selectedExercise
      this.selectedChartTypeControl.setValue(exerciseChartFilterCookie.chartType)
    }

    this.updateChart(this.currentInterval)
  }

  openSelectExerciseDialog() {
    this.dialogsHandlerService.openSelectExerciseDialog().afterClosed()
      .pipe(
        filter(exercise => !isNil(exercise)),
        take(1)
      )
      .subscribe(exercise => {
        this.selectedExercise = exercise;
        this.updateChart(this.currentInterval);
      });
  }

  protected chartTypeSelected() {
    this.updateChart(this.currentInterval);
  }

  protected intervalSelected(interval: Interval) {
    this.currentInterval = interval;
    this.updateChart(this.currentInterval);
  }

  protected updateChart(interval: Interval) {
    this.cookieService.putObject(this.COOKIE_NAME, {
      interval: interval,
      selectedExercise: this.selectedExercise,
      chartType: this.selectedChartTypeControl.value
    });

    if (this.selectedExercise) {
      this.chartJsDashboardService.getWorkoutExerciseChartData(this.selectedChartTypeControl.value, this.selectedExercise.name, this.currentInterval.startDate, this.currentInterval.endDate)
        .pipe(
          take(1)
        )
        .subscribe(data => {
          if (!isNil(this.chart)) {
            this.chart.destroy();
          }

          this.chart = createWorkoutExerciseChartConfig(
            data.data.map(point => moment(point.key).format('DD-MM-YYYY')),
            data.data.map(point => point.value),
            this.getSettings()
          );
      });
    }
  }

  private getSettings(): WorkoutChartSettings {
    let axisYsuffix = "";
    let yValueFormatString = "###";
    switch (this.selectedChartTypeControl.value) {
      case this.exerciseChartType[0].value: // MAX_WEIGHT
      case this.exerciseChartType[2].value: // MAX_VOLUME
      case this.exerciseChartType[3].value: // WORKOUT_VOLUME
        axisYsuffix = " kg";
        break
      case this.exerciseChartType[1].value: // MAX_REPS
      case this.exerciseChartType[4].value: // WORKOUT_REPS
        axisYsuffix = " reps";
        break
    }
    return {
      axisYsuffix: axisYsuffix,
      yValueFormatString: yValueFormatString
    }
  }
}
