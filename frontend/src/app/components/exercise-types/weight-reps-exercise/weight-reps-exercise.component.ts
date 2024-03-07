import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {InputNumberComponent} from "../input-number/input-number.component";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";
import {WorkoutSet} from "../../../model/exercise/workoutSet";

export class WeightReps {
  weight: number;
  reps: number;
}

@Component({
  selector: 'app-weight-reps-exercise',
  templateUrl: './weight-reps-exercise.component.html',
  standalone: true,

  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatIcon,
    InputNumberComponent,
    MatTooltip,
    MatButton,
  ]
})
export class WeightRepsExerciseComponent implements OnInit {

  weightRepsForm: FormGroup;

  @Output()
  public workoutSetsUpdated: EventEmitter<WorkoutSet[]> = new EventEmitter<WorkoutSet[]>();

  protected currentWeight: number = 0;

  protected currentReps: number = 0;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.weightRepsForm = this.formBuilder.group({
      sets: this.formBuilder.array([]),
    });
    this.addSet();
    this.workoutSetsUpdated.emit(this.sets.value);
  }

  get sets(): FormArray {
    return this.weightRepsForm.get('sets') as FormArray;
  }

  protected addSet() {
    const weight = this.currentWeight ? 0 : this.currentWeight;
    const reps = this.currentReps ? 0 : this.currentReps;

    this.sets.push(this.formBuilder.group({
      weight: new FormControl(weight),
      reps: new FormControl(reps),
      distance: [0],
      duration: [0]
    }));
  }

  protected removeSet(i : number) {
    this.sets.removeAt(i);
    this.workoutSetsUpdated.emit(this.sets.value);
  }

  protected weightUpdated(weightValue: number, index: number) {
    this.sets.at(index).patchValue({ weight: weightValue });
    this.currentWeight = weightValue;
    this.workoutSetsUpdated.emit(this.sets.value);
  }

  protected repsUpdated(repsValue: number, index: number) {
    this.sets.at(index).patchValue({ reps: repsValue });
    this.currentReps = repsValue;
    this.workoutSetsUpdated.emit(this.sets.value);
  }

}
