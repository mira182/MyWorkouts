import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DateTimeService} from "../../services/date-time/date-time.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import moment, {Moment} from "moment";

@Component({
  selector: 'app-day-select',
  templateUrl: './day-select.component.html',
  standalone: true,
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
export class DaySelectComponent implements OnInit {

  @Input()
  public inputDate: Moment;

  @Output()
  public dateChanged: EventEmitter<Moment> = new EventEmitter<Moment>();

  public dateFormControl = new FormControl();

  ngOnInit(): void {
    this.dateFormControl = new FormControl(this.inputDate);
  }

  public dateSelected(event: MatDatepickerInputEvent<Moment>) {
    this.dateChanged.emit(event.value);
  }

  public incrementDay() {
    this.dateFormControl.setValue(moment(this.dateFormControl.value).add(1, 'days'));
    this.dateChanged.emit(this.dateFormControl.value);
  }

  public decrementDay() {
    this.dateFormControl.setValue(moment(this.dateFormControl.value).subtract(1, 'days'));
    this.dateChanged.emit(this.dateFormControl.value);
  }
}
