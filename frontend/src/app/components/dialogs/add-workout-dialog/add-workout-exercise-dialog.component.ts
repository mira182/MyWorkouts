import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../../model/exercise/exercise";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from "@angular/forms";
import {WorkoutExercise} from "../../../model/workout-exercise/workoutExercise";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {TranslateModule} from "@ngx-translate/core";
import {Urls} from "../../../model/urls";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatActionList, MatListItem} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {ImageUtilsService} from "../../../services/image/image.utils.service";
import {WeightRepsExerciseComponent} from "../../exercise-types/weight-reps-exercise/weight-reps-exercise.component";
import {RepsExerciseComponent} from "../../exercise-types/reps-exercise/reps-exercise.component";
import {TimeExerciseComponent} from "../../exercise-types/time-exercise/time-exercise.component";
import {MatTooltip} from "@angular/material/tooltip";
import {take} from "rxjs";
import {PageHeaderLayoutComponent} from "../../layouts/page-header-layout/page-header-layout.component";
import {ExerciseService} from "../../../services/rest/exercise/exercise.service";

@Component({
  selector: 'app-add-workout-dialog',
  templateUrl: './add-workout-exercise-dialog.component.html',
  imports: [
    CommonModule,
    MatIcon,
    MatDialogModule,
    MatStepperModule,
    MatIconButton,
    TranslateModule,
    MatActionList,
    MatListItem,
    MatButton,
    WeightRepsExerciseComponent,
    RepsExerciseComponent,
    TimeExerciseComponent,
    MatTooltip,
    PageHeaderLayoutComponent,
  ],
  standalone: true
})
export class AddWorkoutExerciseDialogComponent implements OnInit {

  protected exerciseCategories: string[] = [];

  protected exercisesByCategory: Exercise[] = [];

  protected readonly IMAGE_BASE_URL = Urls.IMAGE_BASE_URL;

  protected selectedExercise: Exercise;

  protected setsForm: FormGroup;

  constructor(protected readonly dialogRef: MatDialogRef<AddWorkoutExerciseDialogComponent>,
              protected readonly exerciseService: ExerciseService,
              protected readonly imageUtilsService: ImageUtilsService,
              private readonly snackBarService: SnackBarService) {
  }

  public ngOnInit(): void {
    this.exerciseService.getAllCategories()
      .pipe(
        take(1),
      )
      .subscribe(categories => this.exerciseCategories = categories);
  }

  protected selectExercise(exercise: Exercise) {
    this.selectedExercise = exercise;
  }

  protected setsUpdated(setsForm: FormGroup) {
    this.setsForm = setsForm;
  }

  protected selectCategory(exerciseCategory: string): void {
    this.exerciseService.getAllExercisesByCategory(exerciseCategory)
      .pipe(take(1))
      .subscribe({
        next: exercises => this.exercisesByCategory = exercises,
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected saveWorkoutExercise() {
    let workoutExercise: WorkoutExercise = {
      exercise: this.selectedExercise,
      workoutSets: this.setsForm.value.sets,
    };

    this.dialogRef.close(workoutExercise);
  }
}
