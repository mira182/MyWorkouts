import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {WorkoutExerciseService} from "../../../services/rest/workout-exercise/workout-exercise.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {TrainingService} from "../../../services/rest/training/training.service";
import {DialogsHandlerService} from "../../../services/dialogs-handler/dialogs-handler.service";
import {AppComponent} from "../../../app.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {WorkoutSetsComponent} from "../../workout-sets/workout-sets.component";
import {PageHeaderLayoutComponent} from "../../layouts/page-header-layout/page-header-layout.component";
import {take} from "rxjs";
import {ExpansionPanelComponent} from "../../expansion-panel/expansion-panel.component";
import {ExerciseItemComponent} from "../../exercise-item/exercise-item.component";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {ExercisesComponent} from "../../exercises/exercises.component";
import {WorkoutExerciseComponent} from "../../workout-exercise/workout-exercise.component";
import {map} from "rxjs/operators";
import {ExerciseService} from "../../../services/rest/exercise/exercise.service";

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    TranslateModule,
    CommonModule,
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
    WorkoutSetsComponent,
    PageHeaderLayoutComponent,
    ExpansionPanelComponent,
    ExerciseItemComponent,
    NgxMaterialTimepickerModule,
    ExercisesComponent,
    WorkoutExerciseComponent,
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
              public dialogsHandler: DialogsHandlerService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      trainingName: ['', Validators.required],
      trainingDay: [AppComponent.weekDays[0], Validators.required],
      trainingTime: ['', Validators.required],
      scheduled: [false, Validators.required],
      startDate: ['', Validators.required],
      workout: this.formBuilder.group({
        workoutExercises: this.formBuilder.array([])
      }),
    });
  }

  get weekDays() {
    return AppComponent.weekDays;
  }

  get workoutExercises() {
    return this.form.get('workout').get('workoutExercises') as FormArray;
  }

  saveTraining() {
    // const workouts: Workout[] = [];
    // this.workouts.value.forEach(workout => {
    //   let workoutSets = [];
    //   workout.workoutSets.forEach(set => {
    //     const workoutSet = new WorkoutSet();
    //     workoutSet.weight = set.weight;
    //     workoutSet.reps = set.reps;
    //     workoutSet.distance = set.reps;
    //     workoutSet.duration = set.durationMin * 60 + set.durationSec;
    //     workoutSets.push(workoutSet);
    //   });
    //   workouts.push(new WorkoutExercise({
    //     id: workout.workoutId,
    //     exercise: workout.exercise,
    //     dateTime: null,
    //     workoutSets: workoutSets
    //   }));
    // });
    // const training = new Training({
    //   id: null,
    //   name: this.workoutsForm.value.trainingName,
    //   workouts: workouts,
    //   trainingDay: this.workoutsForm.value.trainingDay,
    //   trainingTime: this.workoutsForm.value.trainingTime,
    //   scheduled: this.workoutsForm.value.scheduled,
    //   startDate: this.workoutsForm.value.startDate
    // });
    // this.trainingService.createTraining(training).subscribe((savedTraining) => {
    //   this.snackBar.showSuccessSnackBar(this.translate.instant("ALERT.successfully-saved"));
    //   this.dialogRef.close(savedTraining);
    // }, error => {
    //   this.snackBar.showErrorSnackBar(this.translate.instant("ALERT.get-exercises"), error.message);
    //   this.dialogRef.close();
    // });
  }

  protected addWorkoutExerciseToTraining() {
    this.dialogsHandler.openAddWorkoutExerciseDialog().afterClosed()
      .pipe(
        map(workoutExercise => {
          console.log('return from dialog:', workoutExercise);

          const form: FormGroup = this.formBuilder.group({
            exercise: [workoutExercise.exercise],
            workoutSets: this.formBuilder.array([workoutExercise.workoutSets])
          });

          this.workoutExercises.push(form);

          return form;
        }),
        take(1),
      )
      .subscribe();
  }

}
