import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {InputNumberComponent} from "../input-number/input-number.component";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";
import {WorkoutSet} from "../../../model/exercise/workoutSet";

@Component({
  selector: 'app-time-exercise',
  templateUrl: './time-exercise.component.html',
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
        MatCardContent,
    ]
})
export class TimeExerciseComponent implements OnInit {

  @Output()
  public workoutSetUpdated: EventEmitter<WorkoutSet[]> = new EventEmitter<WorkoutSet[]>();

  protected timeForm: FormGroup;

  protected currentMinutes: number = 0;

  protected currentSeconds: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.timeForm = this.formBuilder.group({
      sets: this.formBuilder.array([]),
    });
    this.addSet();
    this.workoutSetUpdated.emit(this.sets.value.sets);
  }

  protected get sets(): FormArray {
    return this.timeForm.get('sets') as FormArray;
  }

  protected addSet() {
    const minutes = this.currentMinutes ? this.currentMinutes : 0;
    const seconds = this.currentSeconds ? this.currentSeconds : 0;

    this.sets.push(this.formBuilder.group({
      duration: [(minutes * 60) + seconds, Validators.required],
      weight: [0],
      reps: [0],
      distance: [0],
    }));

    this.workoutSetUpdated.emit(this.sets.value.sets);
  }

  protected removeSet(i : number) {
    this.sets.removeAt(i);
    this.workoutSetUpdated.emit(this.sets.value.sets);
  }

  protected minutesUpdated(minutesValue: number, index: number) {
    const newDuration: number = this.sets.at(index).get('duration').value + (minutesValue * 60);
    this.sets.at(index).patchValue({ duration: newDuration });
    this.currentMinutes = minutesValue;
    this.workoutSetUpdated.emit(this.sets.value.sets);
  }

  protected secondsUpdated(secondsValue: number, index: number) {
    const newDuration: number = this.sets.at(index).get('duration').value + secondsValue;
    this.sets.at(index).patchValue({ seconds: newDuration });
    this.currentSeconds = secondsValue;
    this.workoutSetUpdated.emit(this.sets.value.sets);
  }

}
