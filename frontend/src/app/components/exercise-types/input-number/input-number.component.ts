import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {isNil} from "lodash";

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  imports: [
    MatIconButton,
    MatFormField,
    CommonModule,
    ReactiveFormsModule,
    MatInput,
    MatIcon,
    MatError,
    MatLabel,
  ],
  standalone: true
})
export class InputNumberComponent implements OnInit {

  @Output()
  public change: EventEmitter<number> = new EventEmitter<number>();

  protected formControl = new FormControl(0, [Validators.required]);

  @Input()
  public step: number;

  @Input()
  public errorMessage: string;

  @Input()
  public label: string;

  @Input()
  public suffix: string;

  @Input()
  public initialValue: number;

  @Input()
  public minimumValue: number;

  public ngOnInit(): void {
    if (this.formControl.value) {
      this.formControl.setValue(this.initialValue);
      this.change.emit(this.formControl.value);
    }
  }

  public increment() {
    if (!isNil(this.formControl.value)) {
      const resultValue = this.formControl.value + this.step;
      this.formControl.setValue(resultValue);
      this.change.emit(this.formControl.value);
    }
  }

  public decrement() {
    if (!isNil(this.formControl.value)) {
      const resultValue = this.formControl.value - this.step;
      if (resultValue >= 0) {
        this.formControl.setValue(resultValue);
        this.change.emit(this.formControl.value);
      }
    }
  }

}
