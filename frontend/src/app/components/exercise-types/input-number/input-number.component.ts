import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {isNil} from "lodash";
import {takeUntil} from "rxjs";
import {Unsubscribe} from "../../unsubscribe/unsubscribe";

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  imports: [
    MatIconButton,
    MatFormField,
    CommonModule,
    ReactiveFormsModule,
    MatInput,
    MatIcon,
    MatError,
    MatLabel,
    MatMiniFabButton,
  ],
  standalone: true
})
export class InputNumberComponent extends Unsubscribe implements OnInit {

  @Output()
  public numberChanged: EventEmitter<number> = new EventEmitter<number>();

  protected formControl = new FormControl<number>(0, [Validators.required]);

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

  public ngOnInit(): void {
    this.formControl.setValue(this.initialValue);
    this.formControl.valueChanges
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe(value => {
        this.numberChanged.emit(value);
      });
  }

  public increment() {
    if (!isNil(this.formControl.value)) {
      const resultValue = this.formControl.value + this.step;
      this.formControl.setValue(resultValue);
    }
  }

  public decrement() {
    if (!isNil(this.formControl.value)) {
      const resultValue = this.formControl.value - this.step;
      if (resultValue >= 0) {
        this.formControl.setValue(resultValue);
      }
    }
  }

}
