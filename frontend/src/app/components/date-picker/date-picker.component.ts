import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {Moment} from "moment";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    MatLabel,
    NgIf,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent {

  @Input()
  public date: FormControl;

  @Output()
  public datePicked = new EventEmitter<Moment>();

  protected dateChanged(date: MatDatepickerInputEvent<Moment>) {
    this.datePicked.emit(date.value);
  }
}
