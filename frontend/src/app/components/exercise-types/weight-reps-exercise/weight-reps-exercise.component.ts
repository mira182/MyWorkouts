import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {InputNumberComponent} from "../input-number/input-number.component";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";
import {isNil} from "lodash";

export class WeightReps {
  weight: number;
  reps: number;
}

@Component({
  selector: 'app-weight-reps-exercise',
  templateUrl: './weight-reps-exercise.component.html',
  styleUrls: ['./weight-reps-exercise.component.scss'],
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
  public update: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  initialWeight: number = 0;

  initialReps: number = 0;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.weightRepsForm = this.formBuilder.group({
      sets: this.formBuilder.array([]),
    });
    this.addSet();
    this.update.emit(this.weightRepsForm);
  }

  get sets(): FormArray {
    return this.weightRepsForm.get('sets') as FormArray;
  }

  newSet(): FormGroup {
    return this.formBuilder.group({
      weight: new FormControl(0),
      reps: new FormControl(0)
    });
  }

  protected addSet() {
    const weight = isNil(this.sets.at(this.sets.length - 1)?.value?.weight) ? 0 : this.sets.at(this.sets.length - 1)?.value?.weight;
    const reps = isNil(this.sets.at(this.sets.length - 1)?.value?.reps) ? 0 : this.sets.at(this.sets.length - 1)?.value?.reps;

    this.sets.push(this.formBuilder.group({
      weight: new FormControl(weight),
      reps: new FormControl(reps)
    }));
  }

  removeSet(i : number) {
    this.sets.removeAt(i);
    this.update.emit(this.weightRepsForm);
  }

  weightUpdated(weightValue: number, index: number) {
    this.sets.at(index).patchValue({weight: weightValue});
    console.log(this.weightRepsForm);
    this.update.emit(this.weightRepsForm);
  }

  repsUpdated(repsValue: number, index: number) {
    this.sets.at(index).patchValue({reps: repsValue});
    this.update.emit(this.weightRepsForm);
  }

}
