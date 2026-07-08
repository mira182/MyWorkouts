import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import {MatCalendar} from '@angular/material/datepicker';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Subject, takeUntil} from 'rxjs';
import moment from 'moment';
import {WorkoutDaysService} from '../../services/workout-days/workout-days.service';

@Component({
  selector: 'workout-calendar-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconButton, MatIcon],
  template: `
    <div class="flex items-center justify-between px-1 py-1">
      <button mat-icon-button type="button" (click)="navigate('year', -1)" aria-label="Previous year">
        <mat-icon>keyboard_double_arrow_left</mat-icon>
      </button>
      <button mat-icon-button type="button" (click)="navigate('month', -1)" aria-label="Previous month">
        <mat-icon>chevron_left</mat-icon>
      </button>
      <span class="text-sm font-semibold">{{ label }}</span>
      <button mat-icon-button type="button" (click)="navigate('month', 1)" aria-label="Next month">
        <mat-icon>chevron_right</mat-icon>
      </button>
      <button mat-icon-button type="button" (click)="navigate('year', 1)" aria-label="Next year">
        <mat-icon>keyboard_double_arrow_right</mat-icon>
      </button>
    </div>
  `,
})
export class WorkoutCalendarHeaderComponent<D> implements OnDestroy {

  private readonly destroyed = new Subject<void>();

  constructor(private readonly calendar: MatCalendar<D>,
              private readonly dateAdapter: DateAdapter<D>,
              @Inject(MAT_DATE_FORMATS) private readonly dateFormats: MatDateFormats,
              private readonly cdr: ChangeDetectorRef,
              private readonly workoutDaysService: WorkoutDaysService) {
    this.calendar.stateChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.cdr.markForCheck();
        this.loadVisibleRange();
      });
    this.loadVisibleRange();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  get label(): string {
    return this.dateAdapter.format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel);
  }

  navigate(unit: 'month' | 'year', delta: number): void {
    this.calendar.activeDate = unit === 'month'
      ? this.dateAdapter.addCalendarMonths(this.calendar.activeDate, delta)
      : this.dateAdapter.addCalendarYears(this.calendar.activeDate, delta);
  }

  private loadVisibleRange(): void {
    // Build the visible range from the adapter (year/month) — includes leading/trailing weeks.
    const year = this.dateAdapter.getYear(this.calendar.activeDate);
    const month = this.dateAdapter.getMonth(this.calendar.activeDate);
    const start = moment({year, month, day: 1}).subtract(7, 'days');
    const end = moment({year, month, day: 1}).endOf('month').add(7, 'days');

    this.workoutDaysService.loadRange(start, end)
      .pipe(takeUntil(this.destroyed))
      .subscribe(added => {
        if (added) {
          this.calendar.updateTodaysDate(); // re-renders the body, re-running [dateClass]
        }
      });
  }
}
