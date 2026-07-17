import {AfterViewInit, Component, Inject, OnDestroy, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';
import moment from 'moment';
import {Chart} from 'chart.js';
import {take} from 'rxjs';
import {Exercise} from '../../../model/exercise/exercise';
import {
  ChartJsDashboardService
} from '../../../services/rest/chart/dashborad/charts/chartjs/chart-js-dashboard.service';
import {createWorkoutExerciseChartConfig} from '../../../model/charts/configuration/create-chart.config';
import {DATE_FORMATS} from '../../../config/date-formats';

/**
 * Progress chart for a single exercise (last 6 months), opened straight from a
 * workout card — same data/config as the dashboard's exercise charts.
 */
@Component({
  selector: 'app-exercise-history-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './exercise-history-dialog.component.html',
})
export class ExerciseHistoryDialogComponent implements AfterViewInit, OnDestroy {

  // Same metric set as the dashboard's exercise charts.
  protected readonly chartTypes = [
    {value: 'MAX_WEIGHT', viewValue: 'Max Weight'},
    {value: 'MAX_REPS', viewValue: 'Max Reps'},
    {value: 'MAX_VOLUME', viewValue: 'Max Volume'},
    {value: 'WORKOUT_VOLUME', viewValue: 'Workout Volume'},
    {value: 'WORKOUT_REPS', viewValue: 'Workout Reps'},
  ];

  protected readonly typeControl = new FormControl('MAX_WEIGHT', {nonNullable: true});

  protected noData = signal(false);

  private chart?: Chart;

  constructor(@Inject(MAT_DIALOG_DATA) protected readonly data: { exercise: Exercise },
              private readonly chartJsDashboardService: ChartJsDashboardService) {
  }

  public ngAfterViewInit(): void {
    this.load();
  }

  public ngOnDestroy(): void {
    this.chart?.destroy();
  }

  protected load(): void {
    this.chartJsDashboardService.getWorkoutExerciseChartData(
      this.typeControl.value, this.data.exercise.name, moment().subtract(6, 'months'), moment())
      .pipe(take(1))
      .subscribe(chartData => {
        this.chart?.destroy();
        this.chart = undefined;
        this.noData.set(!chartData.data.length);
        if (chartData.data.length) {
          this.chart = createWorkoutExerciseChartConfig(
            chartData.data.map(point => moment(point.key).format(DATE_FORMATS.display)),
            chartData.data.map(point => point.value),
            {axisYsuffix: this.suffixFor(this.typeControl.value)},
          );
        }
      });
  }

  private suffixFor(chartType: string): string {
    return chartType === 'MAX_REPS' || chartType === 'WORKOUT_REPS' ? ' reps' : ' kg';
  }
}
