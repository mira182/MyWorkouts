import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Moment} from 'moment';
import {WorkoutService} from '../rest/workout/workout.service';

@Injectable({providedIn: 'root'})
export class WorkoutDaysService {

  private readonly days = new Set<string>();
  private readonly loadedMonths = new Set<string>();

  constructor(private readonly workoutService: WorkoutService) {
  }

  public has(dateKey: string): boolean {
    return this.days.has(dateKey);
  }

  public loadRange(start: Moment, end: Moment): Observable<boolean> {
    const missing = this.missingMonths(start, end);
    if (missing.length === 0) {
      return of(false);
    }

    const rangeStart = missing[0].clone().startOf('month');
    const rangeEnd = missing[missing.length - 1].clone().endOf('month');

    return this.workoutService.getWorkoutDates(rangeStart, rangeEnd).pipe(
      tap(dates => {
        dates.forEach(date => this.days.add(date));
        missing.forEach(month => this.loadedMonths.add(month.format('YYYY-MM')));
      }),
      map(() => true),
    );
  }

  private missingMonths(start: Moment, end: Moment): Moment[] {
    const months: Moment[] = [];
    const cursor = start.clone().startOf('month');
    const last = end.clone().startOf('month');
    while (cursor.isSameOrBefore(last, 'month')) {
      if (!this.loadedMonths.has(cursor.format('YYYY-MM'))) {
        months.push(cursor.clone());
      }
      cursor.add(1, 'month');
    }
    return months;
  }
}
