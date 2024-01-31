import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DateTimeService} from "../../services/date-time/date-time.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import moment, {Moment} from "moment";
import {isNil} from 'lodash';

@Component({
  selector: 'app-day-select',
  templateUrl: './day-select.component.html',
  styleUrls: ['./day-select.component.scss'],
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
  public inputDate: Moment | null | undefined;

  @Output()
  public dateChanged: EventEmitter<Moment> = new EventEmitter<Moment>();

  public dateFormControl = new FormControl();

  ngOnInit(): void {
    if (isNil(this.inputDate)) {
      this.inputDate = moment().subtract(1, 'days');
      this.dateChanged.emit(this.inputDate);
    }

    this.dateFormControl = new FormControl(this.inputDate);
  }

  public dateSelected(event: MatDatepickerInputEvent<Moment>) {
    this.inputDate = event.value;
    if (!isNil(this.inputDate)) {
      this.dateChanged.emit(this.inputDate);
    }
  }

  public incrementDay() {
    this.inputDate = this.inputDate?.add(1, 'days');
    this.dateChanged.emit(this.inputDate);
  }

  public decrementDay() {
    this.inputDate = this.inputDate?.subtract(1, 'days');
    this.dateChanged.emit(this.inputDate);
  }
}
