import {Component, OnInit, ViewChild} from '@angular/core';
import {Exercise} from "../../../model/exercise/exercise";
import {ExerciseCategory} from "../../../model/exercise/exerciseCategory";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from "@angular/forms";
import {WorkoutSet} from "../../../model/exercise/workoutSet";
import {WorkoutExercise} from "../../../model/exercise/workoutExercise";
import {ExerciseService} from "../../../services/rest/exercise/exercise.service";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
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

@Component({
  selector: 'app-add-workout-dialog',
  templateUrl: './add-workout-exercise-dialog.component.html',
  styleUrls: ['./add-workout-exercise-dialog.component.scss'],
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

  protected saveWorkoutExercise() {
    let workoutExercise: WorkoutExercise = {
      exercise: this.selectedExercise,
      workoutSets: this.setsForm.value.sets,
    };

    this.dialogRef.close(workoutExercise);
  }

  protected selectCategory(exerciseCategory: string): void {
    this.exerciseService.getAllExercisesByCategory(exerciseCategory)
      .pipe(take(1))
      .subscribe({
        next: exercises => this.exercisesByCategory = exercises,
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }
}
