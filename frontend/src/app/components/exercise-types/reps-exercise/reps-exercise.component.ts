import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {InputNumberComponent} from "../input-number/input-number.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";
import {WorkoutSet} from "../../../model/exercise/workoutSet";

@Component({
  selector: 'app-reps-exercise',
  templateUrl: './reps-exercise.component.html',
  standalone: true,
  imports: [
    MatCard,
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    InputNumberComponent,
    TranslateModule,
    MatTooltip,
    MatButton,
    MatCardContent,
  ]
})
export class RepsExerciseComponent implements OnInit {

  protected repsForm: FormGroup;

  @Output()
  public workoutSetsUpdated: EventEmitter<WorkoutSet[]> = new EventEmitter<WorkoutSet[]>();

  protected currentReps: number = 0;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.repsForm = this.formBuilder.group({
      sets: this.formBuilder.array([]),
    });
    this.addSet();
    this.workoutSetsUpdated.emit(this.sets.value);
  }

  protected get sets(): FormArray {
    return this.repsForm.get('sets') as FormArray;
  }

  protected addSet() {
    const reps = this.currentReps ? this.currentReps : 0;

    this.sets.push(this.formBuilder.group({
      reps: new FormControl(reps),
      weight: [0],
      distance: [0],
      duration: [0]
    }));

    this.workoutSetsUpdated.emit(this.sets.value);
  }

  protected removeSet(i : number) {
    this.sets.removeAt(i);
    this.workoutSetsUpdated.emit(this.sets.value);
  }

  protected repsUpdated(repsValue: number, index: number) {
    this.sets.at(index).patchValue({reps: repsValue});
    this.currentReps = repsValue;
    this.workoutSetsUpdated.emit(this.sets.value);
  }
}
