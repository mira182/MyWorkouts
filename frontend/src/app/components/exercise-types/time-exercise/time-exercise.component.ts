import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {InputNumberComponent} from "../input-number/input-number.component";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-time-exercise',
  templateUrl: './time-exercise.component.html',
  styleUrls: ['./time-exercise.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    TranslateModule,
    ReactiveFormsModule,
    InputNumberComponent,
    MatIcon,
    MatTooltip,
    MatButton,
  ]
})
export class TimeExerciseComponent implements OnInit {

  @Output()
  public update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  protected timeForm: FormGroup;

  protected initialMinutes: number = 0;

  protected initialSeconds: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.timeForm = this.formBuilder.group({
      sets: this.formBuilder.array([]),
    });
    this.addSet();
    this.update.emit(this.timeForm);
  }

  protected get sets(): FormArray {
    return this.timeForm.get('sets') as FormArray;
  }

  protected newSet(): FormGroup {
    return this.formBuilder.group({
      minutes: new FormControl(0),
      seconds: new FormControl(0)
    });
  }

  protected addSet() {
    if (this.sets.length > 0) {
      this.initialMinutes = this.sets.at(this.sets.length - 1).value.minutes;
      this.initialSeconds = this.sets.at(this.sets.length - 1).value.seconds;
    }
    this.sets.push(this.newSet());
    this.update.emit(this.timeForm);
  }

  protected removeSet(i : number) {
    this.sets.removeAt(i);
    this.update.emit(this.timeForm);
  }

  protected minutesUpdated(minutesValue: number, index: number) {
    this.sets.at(index).patchValue({minutes: minutesValue});
    this.update.emit(this.timeForm);
  }

  protected secondsUpdated(secondsValue: number, index: number) {
    this.sets.at(index).patchValue({seconds: secondsValue});
    this.update.emit(this.timeForm);
  }

}
