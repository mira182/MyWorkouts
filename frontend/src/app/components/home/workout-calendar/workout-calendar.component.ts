import {Component, OnInit, signal} from '@angular/core';

import {Router} from "@angular/router";
import moment, {Moment} from "moment";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {take} from "rxjs";
import {WorkoutService} from "../../../services/rest/workout/workout.service";
import {WorkoutDayService} from "../../../services/rest/workout/workout-day.service";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {DATE_FORMATS} from "../../../config/date-formats";

interface CalendarDay {
  date: Moment;
  inMonth: boolean;
  isToday: boolean;
  hasWorkout: boolean;
}

@Component({
    selector: 'app-workout-calendar',
    imports: [
    MatIcon,
    MatIconButton
],
    templateUrl: './workout-calendar.component.html',
    styleUrl: './workout-calendar.component.scss'
})
export class WorkoutCalendarComponent implements OnInit {

  protected readonly DATE_FORMATS = DATE_FORMATS;

  protected month: Moment = moment().startOf('month');
  protected weeks = signal<CalendarDay[][]>([]);
  protected readonly weekdayLabels = Array.from({length: 7}, (_, i) => moment().isoWeekday(i + 1).format(DATE_FORMATS.weekdayMin));

  constructor(private readonly workoutService: WorkoutService,
              private readonly workoutDayService: WorkoutDayService,
              private readonly snackBar: SnackBarService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.loadMonth();
  }

  protected previousMonth(): void {
    this.month = this.month.clone().subtract(1, 'month');
    this.loadMonth();
  }

  protected nextMonth(): void {
    this.month = this.month.clone().add(1, 'month');
    this.loadMonth();
  }

  protected openDay(day: CalendarDay): void {
    this.workoutDayService.setWorkoutDay(day.date.clone());
    this.router.navigate(['/workouts']);
  }

  private loadMonth(): void {
    const start = this.month.clone().startOf('month');
    const end = this.month.clone().endOf('month');
    this.workoutService.getWorkoutDates(start, end)
      .pipe(take(1))
      .subscribe({
        next: dates => this.buildGrid(new Set(dates)),
        error: err => {
          this.buildGrid(new Set());
          this.snackBar.showErrorSnackBar(err?.error);
        },
      });
  }

  private buildGrid(workoutDays: Set<string>): void {
    const start = this.month.clone().startOf('month').startOf('isoWeek');
    const end = this.month.clone().endOf('month').endOf('isoWeek');
    const today = moment();
    const weeks: CalendarDay[][] = [];
    const cursor = start.clone();

    while (cursor.isSameOrBefore(end, 'day')) {
      const week: CalendarDay[] = [];
      for (let i = 0; i < 7; i++) {
        week.push({
          date: cursor.clone(),
          inMonth: cursor.isSame(this.month, 'month'),
          isToday: cursor.isSame(today, 'day'),
          hasWorkout: workoutDays.has(cursor.format('yyyy-MM-DD')),
        });
        cursor.add(1, 'day');
      }
      weeks.push(week);
    }
    this.weeks.set(weeks);
  }
}
