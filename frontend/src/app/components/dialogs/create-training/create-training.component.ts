import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {WorkoutExerciseService} from "../../../services/rest/workout-exercise/workout-exercise.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {TrainingService} from "../../../services/rest/training/training.service";
import {DialogsHandlerService} from "../../../services/dialogs-handler/dialogs-handler.service";
import {AppComponent} from "../../../app.component";
import {MatFormFieldModule} from "@angular/material/form-field";

import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {PageHeaderLayoutComponent} from "../../layouts/page-header-layout/page-header-layout.component";
import {WorkoutSetsComponent} from "../../workout-sets/workout-sets.component";
import {filter, take} from "rxjs";
import {map} from "rxjs/operators";
import {ExerciseService} from "../../../services/rest/exercise/exercise.service";
import {TrainingPlan} from "../../../model/training/trainingPlan";
import moment from "moment";

@Component({
    selector: 'app-create-training',
    templateUrl: './create-training.component.html',
    imports: [
    MatFormFieldModule,
    TranslateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIcon,
    MatIconButton,
    MatButton,
    MatDialogModule,
    MatInput,
    PageHeaderLayoutComponent,
    WorkoutSetsComponent
]
})
export class CreateTrainingComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateTrainingComponent>,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private exerciseService: ExerciseService,
              private workoutService: WorkoutExerciseService,
              private trainingService: TrainingService,
              private translate: TranslateService,
              private snackBar: SnackBarService,
              private cdr: ChangeDetectorRef,
              public dialogsHandler: DialogsHandlerService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      trainingName: ['', Validators.required],
      trainingDay: [AppComponent.weekDays[0], Validators.required],
      trainingTime: ['', Validators.required],
      scheduled: [false, Validators.required],
      startDate: ['', Validators.required],
      trainingExercises: this.formBuilder.array([]),
    });
  }

  get weekDays() {
    return AppComponent.weekDays;
  }

  get trainingExercises() {
    return this.form.get('trainingExercises') as FormArray;
  }

  saveTraining() {
    const value = this.form.getRawValue();

    const training = {
      name: value.trainingName,
      trainingDay: value.trainingDay,
      trainingTime: value.trainingTime,
      scheduled: value.scheduled,
      startDate: value.startDate ? moment(value.startDate).format('YYYY-MM-DD') : null,
      trainingExercises: (value.trainingExercises ?? []).map(trainingExercise => ({
        exercise: trainingExercise.exercise,
        trainingSets: (trainingExercise.workoutSets ?? trainingExercise.trainingSets ?? []).map(set => ({
          reps: set.reps,
          weight: set.weight,
          duration: set.duration,
          distance: set.distance,
        })),
      })),
    } as TrainingPlan;

    this.trainingService.createTraining(training)
      .pipe(take(1))
      .subscribe({
        next: savedTraining => {
          this.snackBar.showSuccessSnackBar('ALERT.successfully-saved');
          this.dialogRef.close(savedTraining);
        },
        error: err => this.snackBar.showErrorSnackBar(err),
      });
  }

  protected addWorkoutExerciseToTraining() {
    this.dialogsHandler.openAddWorkoutExerciseDialog().afterClosed()
      .pipe(
        filter(workoutExercise => !!workoutExercise),
        map(workoutExercise => {
          const form: FormGroup = this.formBuilder.group({
            exercise: [workoutExercise.exercise],
            trainingSets: [workoutExercise.workoutSets]
          });

          this.trainingExercises.push(form);

          return form;
        }),
        take(1),
      )
      .subscribe(() => this.cdr.markForCheck());
  }

}
