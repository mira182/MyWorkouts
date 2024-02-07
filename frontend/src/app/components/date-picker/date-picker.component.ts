import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    TranslateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent {

  @Input()
  public date: FormControl;
}
