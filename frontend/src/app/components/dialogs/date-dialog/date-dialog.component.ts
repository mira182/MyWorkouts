import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-date-dialog',
  templateUrl: './date-dialog.component.html',
  styleUrls: ['./date-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormField,
    MatDatepickerModule,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatLabel,
  ]
})
export class DateDialogComponent {

  protected dateFormControl = new FormControl(new Date());

}
