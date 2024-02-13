import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import moment from "moment";

@Component({
  selector: 'app-range-date-picker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './range-date-picker.component.html',
})
export class RangeDatePickerComponent implements OnInit {

  protected form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      start: new FormControl(moment()),
      end: new FormControl(moment().add(6, 'days')),
    });
  }
}
