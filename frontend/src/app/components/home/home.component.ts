import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import moment, {Moment} from "moment";
import {forkJoin, take} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../../services/rest/user/user.service";
import {User} from "../../model/user/user";
import {NgxWeightChartService} from "../../services/rest/chart/weight/ngx/ngx-weight-chart.service";
import {NgxWeightChartData} from "../weight/model/ngx-chart-data-model";
import {NgxLineChartComponent} from "../weight/charts/ngx-line-chart/ngx-line-chart.component";
import {WorkoutService} from "../../services/rest/workout/workout.service";
import {Workout} from "../../model/workout/workout";
import {WithingsService} from "../../services/weight/withings/withings.service";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {WorkoutCalendarComponent} from "./workout-calendar/workout-calendar.component";
import {SkeletonComponent} from "../skeleton/skeleton.component";
import {
  NgxDashboardChartData,
  NgxDashboardService
} from "../../services/rest/chart/dashborad/charts/ngx/ngx-dashboard.service";

interface WeightPoint {
  time: number;
  value: number;
}

interface WeekSummary {
  workouts: number;
  volume: number;
  workoutsDelta: number;
  volumeDelta: number;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
        RouterLink,
        MatCardModule,
        MatButtonModule,
        MatIcon,
        MatTooltip,
        NgxSpinnerModule,
        NgxLineChartComponent,
        WorkoutCalendarComponent,
        SkeletonComponent,
    ],
    providers: [
        WithingsService,
    ]
})
export class HomeComponent implements OnInit {

  protected user: User;
  protected greetingKey: string;

  // Weight card — all values are scoped to the selected ISO week (Monday–Sunday).
  protected latestWeight = signal<number | undefined>(undefined);
  protected deltaWeek = signal<number | undefined>(undefined);
  protected deltaMonth = signal<number | undefined>(undefined);
  protected deltaAvgWeek = signal<number | undefined>(undefined);
  protected sparkData = signal<NgxWeightChartData[]>([]);
  protected selectedWeekStart: Moment = moment().startOf('isoWeek');

  private weightData?: NgxWeightChartData;
  private allPoints: WeightPoint[] = [];

  protected todayWorkout = signal<Workout | null>(null);

  protected weekSummary = signal<WeekSummary | null | undefined>(undefined);
  protected summaryWeightDelta = signal<number | undefined>(undefined);

  protected weightLoaded = signal(false);

  constructor(private readonly chartService: NgxWeightChartService,
              private readonly workoutService: WorkoutService,
              private readonly withingsService: WithingsService,
              private readonly ngxDashboardService: NgxDashboardService,
              private readonly snackBar: SnackBarService,
              private readonly spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.user = UserService.getCurrentUser();
    this.greetingKey = HomeComponent.greetingKeyForHour(new Date().getHours());
    this.loadWeight();
    this.loadTodayWorkout();
    this.loadWeekSummary();
  }

  private loadWeekSummary(): void {
    const thisWeekStart = moment().startOf('isoWeek');
    const thisWeekEnd = thisWeekStart.clone().add(6, 'days');
    const lastWeekStart = thisWeekStart.clone().subtract(1, 'week');
    const lastWeekEnd = thisWeekStart.clone().subtract(1, 'day');

    forkJoin([
      this.ngxDashboardService.getTotalsChartData(thisWeekStart, thisWeekEnd),
      this.ngxDashboardService.getTotalsChartData(lastWeekStart, lastWeekEnd),
    ])
      .pipe(take(1))
      .subscribe({
        next: ([current, previous]) => {
          const read = (data: NgxDashboardChartData, key: string) =>
            data.data.find(point => String(point.name) === key)?.value ?? 0;
          this.weekSummary.set({
            workouts: read(current, 'WORKOUTS_COUNT'),
            volume: read(current, 'WORKOUTS_VOLUME'),
            workoutsDelta: read(current, 'WORKOUTS_COUNT') - read(previous, 'WORKOUTS_COUNT'),
            volumeDelta: read(current, 'WORKOUTS_VOLUME') - read(previous, 'WORKOUTS_VOLUME'),
          });
        },
        error: () => this.weekSummary.set(null), // summary is decoration; hide silently on failure
      });
  }

  private static greetingKeyForHour(hour: number): string {
    if (hour < 12) {
      return 'HOME.good-morning';
    }
    return hour < 18 ? 'HOME.good-afternoon' : 'HOME.good-evening';
  }

  private loadWeight(): void {
    this.chartService.getMeasurementsByProviderAndType('WITHINGS', 'WEIGHT')
      .pipe(take(1))
      .subscribe({
        next: data => this.computeWeightSummary(data),
        error: (err) => {
          this.weightLoaded.set(true);
          this.snackBar.showErrorSnackBar(err?.error);
        },
      });
  }

  private computeWeightSummary(data: NgxWeightChartData): void {
    this.weightData = data;
    this.allPoints = (data?.series ?? [])
      .filter(point => point.value > 0)
      .map(point => ({time: new Date(point.name as unknown as string).getTime(), value: point.value}))
      .sort((a, b) => a.time - b.time);
    // Summary tile: current week's average vs last week's, regardless of week navigation.
    this.summaryWeightDelta.set(
      HomeComponent.weeklyAvgDelta(this.allPoints, moment().startOf('isoWeek').valueOf()));
    this.recomputeWeek();
    this.weightLoaded.set(true);
  }

  protected previousWeek(): void {
    this.selectedWeekStart = this.selectedWeekStart.clone().subtract(1, 'week');
    this.recomputeWeek();
  }

  protected nextWeek(): void {
    if (!this.isCurrentWeek) {
      this.selectedWeekStart = this.selectedWeekStart.clone().add(1, 'week');
      this.recomputeWeek();
    }
  }

  protected get isCurrentWeek(): boolean {
    return this.selectedWeekStart.isSame(moment().startOf('isoWeek'), 'day');
  }

  protected get weekLabel(): string {
    const weekEnd = this.selectedWeekStart.clone().add(6, 'days');
    return `${this.selectedWeekStart.format('D.M.')} – ${weekEnd.format('D.M.YYYY')}`;
  }

  private recomputeWeek(): void {
    const startMs = this.selectedWeekStart.valueOf();
    const endMs = this.selectedWeekStart.clone().add(7, 'days').valueOf();

    const weekPoints = this.allPoints.filter(point => point.time >= startMs && point.time < endMs);
    const latest = weekPoints[weekPoints.length - 1];

    if (!latest) {
      this.latestWeight.set(undefined);
      this.deltaWeek.set(undefined);
      this.deltaMonth.set(undefined);
      this.deltaAvgWeek.set(undefined);
      this.sparkData.set([]);
      return;
    }

    this.latestWeight.set(latest.value);
    this.deltaWeek.set(HomeComponent.deltaSince(this.allPoints, latest, 7));
    this.deltaMonth.set(HomeComponent.deltaSince(this.allPoints, latest, 30));
    this.deltaAvgWeek.set(HomeComponent.weeklyAvgDelta(this.allPoints, startMs));

    this.sparkData.set([{
      ...this.weightData!,
      series: (this.weightData?.series ?? []).filter(point => {
        const time = new Date(point.name as unknown as string).getTime();
        return point.value > 0 && time >= startMs && time < endMs;
      }),
    }]);
  }

  private static deltaSince(points: WeightPoint[], latest: WeightPoint, days: number): number | undefined {
    const dayInMillis = 86_400_000
    const cutoff = latest.time - days * dayInMillis;
    const reference = [...points].reverse().find(point => point.time <= cutoff);
    return reference ? latest.value - reference.value : undefined;
  }

  /** Average of the selected week minus average of the previous calendar week. */
  private static weeklyAvgDelta(points: WeightPoint[], weekStartMs: number): number | undefined {
    const oneWeek = 7 * 86_400_000;
    const selectedWeek = points.filter(p => p.time >= weekStartMs && p.time < weekStartMs + oneWeek);
    const previousWeek = points.filter(p => p.time >= weekStartMs - oneWeek && p.time < weekStartMs);

    if (!selectedWeek.length || !previousWeek.length) {
      return undefined;
    }

    const average = (values: WeightPoint[]) =>
      values.reduce((sum, point) => sum + point.value, 0) / values.length;

    return average(selectedWeek) - average(previousWeek);
  }

  private loadTodayWorkout(): void {
    this.workoutService.getWorkoutForDay(moment())
      .pipe(take(1))
      .subscribe({
        next: workout => this.todayWorkout.set(workout),
        error: (err) => this.snackBar.showErrorSnackBar(err?.error),
      });
  }

  protected syncWithings(): void {
    this.spinner.show();
    this.withingsService.getWithingsAuthUrl('/home')
      .pipe(take(1))
      .subscribe({
        next: response => {
          if (response?.authUrl) {
            window.location.href = response.authUrl;
          } else {
            this.spinner.hide();
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.snackBar.showErrorSnackBar(err?.error);
        },
      });
  }

  protected deltaClass(delta?: number): string {
    if (delta === undefined || delta === 0) {
      return '';
    }
    return delta > 0 ? 'up' : 'down';
  }

  protected deltaArrow(delta?: number): string {
    if (delta === undefined || delta === 0) {
      return '•';
    }
    return delta > 0 ? '▲' : '▼';
  }

  protected deltaAbs(delta?: number): number {
    return Math.abs(delta ?? 0);
  }

  /** Compact stat-tile value: 1284 → "1,284", 12400 → "12.4K". */
  protected compact(value: number): string {
    return value >= 10_000
      ? `${(value / 1000).toFixed(1)}K`
      : Math.round(value).toLocaleString();
  }

  /** Signed compact delta for the "vs last week" line: +2, −1.2K, ±0. */
  protected signedDelta(delta: number | undefined, decimals = 0): string {
    if (delta === undefined || delta === 0) {
      return '±0';
    }
    const abs = Math.abs(delta);
    const text = abs >= 10_000 ? `${(abs / 1000).toFixed(1)}K` : abs.toFixed(decimals);
    return (delta > 0 ? '+' : '−') + text;
  }

  /** Green when the change is in the desired direction, red otherwise, muted when flat. */
  protected deltaToneClass(delta: number | undefined, upIsGood: boolean): string {
    if (delta === undefined || delta === 0) {
      return 'opacity-60';
    }
    return (delta > 0) === upIsGood ? 'text-[#66bb6a]' : 'text-[#ef5350]';
  }
}
