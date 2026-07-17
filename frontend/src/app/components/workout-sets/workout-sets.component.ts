import {Component, Input, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {WorkoutSet} from "../../model/exercise/workoutSet";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {WorkoutSetComponentConfigurationModel} from "../workout-exercise/model/workout-set-configuratio.model";
import {ExerciseType} from "../../model/exercise/exerciseType";

@Component({
    selector: 'workout-sets',
    imports: [
    NgClass,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatMiniFabButton,
    MatInput,
    MatSuffix,
    MatTooltip,
    ReactiveFormsModule,
    TranslateModule
],
    templateUrl: './workout-sets.component.html',
    styleUrl: './workout-sets.component.scss'
})
export class WorkoutSetsComponent implements OnInit {

  @Input()
  public workoutSets: WorkoutSet[] = [];

  @Input()
  public form: FormGroup;

  protected config: WorkoutSetComponentConfigurationModel;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {

    this.form.addControl('workoutSets', this.formBuilder.array([]));

    this.initWorkoutSets(this.workoutSets);

    this.form.disable();

    this.config = this.createConfiguration();
  }

  protected get workoutSetsFormArray(): FormArray {
    return this.form.get('workoutSets') as FormArray;
  }

  protected getWorkoutSetFormControl(controlName: string, index: number): FormControl {
    return this.workoutSetsFormArray.at(index).get(controlName) as FormControl;
  }

  private initWorkoutSets(workoutSets: WorkoutSet[]) {
    workoutSets.forEach(set => {
      this.workoutSetsFormArray.push(this.formBuilder.group({
        weight: new FormControl(set.weight, Validators.required),
        reps: new FormControl(set.reps, Validators.required),
        distance: new FormControl(set.distance, Validators.required),
        duration: new FormControl(set.duration, Validators.required),
      }));
    });
  }

  protected addNewWorkoutSet(): void {
    this.workoutSetsFormArray.push(this.formBuilder.group({
      weight: new FormControl(0, Validators.required),
      reps: new FormControl(0, Validators.required),
      distance: new FormControl(0, Validators.required),
      duration: new FormControl(0, Validators.required),
    }));
  }

  protected step(controlName: string, index: number, direction: number, stepSize: number): void {
    const control = this.getWorkoutSetFormControl(controlName, index);
    if (!control) {
      return;
    }
    const next = (Number(control.value) || 0) + direction * stepSize;
    control.setValue(Math.max(0, Math.round(next * 100) / 100));
  }

  protected duplicateLastSet(): void {
    const last = this.workoutSetsFormArray.at(this.workoutSetsFormArray.length - 1);
    if (!last) {
      this.addNewWorkoutSet();
      return;
    }
    const values = last.getRawValue();
    this.workoutSetsFormArray.push(this.formBuilder.group({
      weight: new FormControl(values.weight, Validators.required),
      reps: new FormControl(values.reps, Validators.required),
      distance: new FormControl(values.distance, Validators.required),
      duration: new FormControl(values.duration, Validators.required),
    }));
  }

  private createConfiguration(): WorkoutSetComponentConfigurationModel {
    switch (this.form.get('exercise').value.type) {
      case ExerciseType.WEIGHTED_REPS:
        return {
          formControls: [{
            name: 'weight',
            step: 2.5,
            unit: 'kg'
          }, {
            name: 'reps',
            step: 1,
            unit: 'reps'
          }]
        };
      case ExerciseType.REPS:
        return {
          formControls: [{
            name: 'reps',
            step: 1,
            unit: 'reps'
          }]
        };
      case ExerciseType.TIME:
        return {
          formControls: [{
            name: 'durationMin',
            step: 1,
            unit: 'min'
          }, {
            name: 'durationSec',
            step: 1,
            unit: 'sec'
          }]
        };
      case ExerciseType.WEIGHTED:
        return {
          formControls: [{
            name: 'weight',
            step: 2.5,
            unit: 'kg'
          }]
        };
      default:
        return undefined;
    }
  }

}
