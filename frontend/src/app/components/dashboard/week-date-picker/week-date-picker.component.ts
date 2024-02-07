import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
  MatDateRangeSelectionStrategy
} from "@angular/material/datepicker";
import {DateAdapter} from "@angular/material/core";
import {Interval} from "../../../model/time/interval";
import moment from "moment";
import {MatFormFieldModule} from "@angular/material/form-field";

@Injectable()
export class WeekRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createWeekRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createWeekRange(activeDate);
  }

  private _createWeekRange(date: D | null): DateRange<D> {
    if (date) {
      const myStart = moment(date).startOf('isoWeek');
      const startDate = this._dateAdapter.createDate(myStart.year(), myStart.month(), myStart.date());
      const endDate = this._dateAdapter.addCalendarDays(startDate, 6);
      return new DateRange<D>(startDate, endDate);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-week-date-picker',
  templateUrl: './week-date-picker.component.html',
  standalone: true,
  providers: [{
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: WeekRangeSelectionStrategy
  }],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ]
})
export class WeekDatePickerComponent implements OnInit {

  protected range: FormGroup;

  @Output()
  protected dateUpdated: EventEmitter<Interval> = new EventEmitter<Interval>();

  constructor(private readonly formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    const currentWeek: Interval = {
      startDate: moment().startOf('isoWeek'),
      endDate: moment().startOf('isoWeek').clone().add(6, 'days')
    };

    this.range = this.formBuilder.group({
      start: [currentWeek.startDate],
      end: [currentWeek.endDate]
    });

    this.dateUpdated.emit(currentWeek);
  }

  protected startDateSelected(event) {
    this.dateUpdated.emit({
      startDate: event.value,
      endDate: event.value.clone().add(6, 'days'),
    });
  }

}
