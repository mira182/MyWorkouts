import {Component, Input, OnInit} from '@angular/core';
import {WorkoutSet} from "../../model/exercise/workoutSet";
import {DatePickerComponent} from "../date-picker/date-picker.component";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {WorkoutSetComponentConfigurationModel} from "../workout-exercise/model/workout-set-configuratio.model";
import {ExerciseType} from "../../model/exercise/exerciseType";

@Component({
  selector: 'app-workout-sets',
  standalone: true,
  imports: [
    DatePickerComponent,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatSuffix,
    MatTooltip,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './workout-sets.component.html',
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
        durationMin: new FormControl(Math.floor(set.duration / 60), Validators.required),
        durationSec: new FormControl(set.duration % 60, Validators.required)
      }));
    });
  }

  protected addNewWorkoutSet(): void {
    this.workoutSetsFormArray.push(this.formBuilder.group({
      weight: new FormControl(0, Validators.required),
      reps: new FormControl(0, Validators.required),
      distance: new FormControl(0, Validators.required),
      durationMin: new FormControl(0, Validators.required),
      durationSec: new FormControl(0, Validators.required)
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
