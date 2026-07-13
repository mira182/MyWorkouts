import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatCalendarCellClassFunction, MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DateTimeService} from "../../services/date-time/date-time.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import moment, {Moment} from "moment";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WorkoutDaysService} from "../../services/workout-days/workout-days.service";
import {WorkoutCalendarHeaderComponent} from "./workout-calendar-header.component";
import {DATE_FORMATS} from "../../config/date-formats";

@Component({
    selector: 'app-day-select',
    templateUrl: './day-select.component.html',
    imports: [
        MatFormFieldModule,
        MatDatepickerModule,
        MatIcon,
        MatInput,
        MatIconButton,
        ReactiveFormsModule,
    ],
    providers: [
        DateTimeService,
    ]
})
export class DaySelectComponent implements OnInit, OnChanges {

  @Input()
  public inputDate: Moment;

  @Output()
  public dateChanged: EventEmitter<Moment> = new EventEmitter<Moment>();

  public dateFormControl = new FormControl();

  protected readonly workoutCalendarHeader = WorkoutCalendarHeaderComponent;

  protected readonly workoutDateClass: MatCalendarCellClassFunction<Moment> = (date, view) =>
    view === 'month' && this.workoutDaysService.has(date.format(DATE_FORMATS.apiDate)) ? 'has-workout-day' : '';

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly workoutDaysService: WorkoutDaysService) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['inputDate'].firstChange && changes['inputDate'].previousValue != changes['inputDate'].currentValue) {
      this.dateFormControl = new FormControl(changes['inputDate'].currentValue);
      this.myMethodChangingQueryParams(changes['inputDate'].currentValue);
    }
  }

  public ngOnInit(): void {
    this.dateFormControl = new FormControl(this.inputDate);
    this.myMethodChangingQueryParams(this.inputDate);
  }

  public dateSelected(event: MatDatepickerInputEvent<Moment>) {
    this.dateChanged.emit(event.value);
    this.myMethodChangingQueryParams(event.value);
  }

  public incrementDay() {
    this.dateFormControl.setValue(moment(this.dateFormControl.value).add(1, 'days'));
    this.dateChanged.emit(this.dateFormControl.value);
    this.myMethodChangingQueryParams(this.dateFormControl.value);
  }

  public decrementDay() {
    this.dateFormControl.setValue(moment(this.dateFormControl.value).subtract(1, 'days'));
    this.dateChanged.emit(this.dateFormControl.value);
    this.myMethodChangingQueryParams(this.dateFormControl.value);
  }

  public myMethodChangingQueryParams(date: Moment) {
    const queryParams: Params = { date: date.format(DATE_FORMATS.apiDate) };

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams,
      }
    );
  }
}
