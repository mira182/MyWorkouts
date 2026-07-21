import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {Exercise} from "../../../model/exercise/exercise";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {WorkoutExercise} from "../../../model/workout-exercise/workoutExercise";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {TranslateModule} from "@ngx-translate/core";
import {Urls} from "../../../model/urls";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatActionList, MatListItem} from "@angular/material/list";
import { NgOptimizedImage } from "@angular/common";
import {ImageUtilsService} from "../../../services/image/image.utils.service";
import {WeightRepsExerciseComponent} from "../../exercise-types/weight-reps-exercise/weight-reps-exercise.component";
import {RepsExerciseComponent} from "../../exercise-types/reps-exercise/reps-exercise.component";
import {TimeExerciseComponent} from "../../exercise-types/time-exercise/time-exercise.component";
import {MatTooltip} from "@angular/material/tooltip";
import {finalize, take} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {PageHeaderLayoutComponent} from "../../layouts/page-header-layout/page-header-layout.component";
import {ExerciseService} from "../../../services/rest/exercise/exercise.service";
import {WorkoutSet} from "../../../model/exercise/workoutSet";

@Component({
    selector: 'app-add-workout-dialog',
    templateUrl: './add-workout-exercise-dialog.component.html',
    styleUrl: './add-workout-exercise-dialog.component.scss',
    imports: [
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
    NgOptimizedImage,
    MatProgressSpinner
]
})
export class AddWorkoutExerciseDialogComponent implements OnInit {

  protected exerciseCategories = signal<string[]>([]);

  protected exercisesByCategory = signal<Exercise[]>([]);

  protected loadingExercises = signal(false);

  protected readonly IMAGE_BASE_URL = Urls.IMAGE_BASE_URL;

  protected selectedExercise: Exercise;

  protected workoutSets: WorkoutSet[];

  protected collected = signal<WorkoutExercise[]>([]);

  @ViewChild(MatStepper) private stepper: MatStepper;

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
      .subscribe(categories => this.exerciseCategories.set(categories));
  }

  protected selectExercise(exercise: Exercise) {
    this.selectedExercise = exercise;
  }

  protected setsUpdated(workoutSets: WorkoutSet[]) {
    this.workoutSets = workoutSets;
  }

  protected selectCategory(exerciseCategory: string): void {
    this.exercisesByCategory.set([]);
    this.loadingExercises.set(true);
    this.exerciseService.getAllExercisesByCategory(exerciseCategory)
      .pipe(
        finalize(() => this.loadingExercises.set(false)),
        take(1),
      )
      .subscribe({
        next: exercises => this.exercisesByCategory.set(exercises),
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected saveWorkoutExercise() {
    this.collectCurrent();
    this.dialogRef.close(this.collected());
  }

  protected saveAndAddAnother(): void {
    this.collectCurrent();
    this.selectedExercise = undefined;
    this.workoutSets = undefined;
    this.exercisesByCategory.set([]);
    this.stepper.reset();
  }

  private collectCurrent(): void {
    this.collected.update(list => [...list, {
      exercise: this.selectedExercise,
      workoutSets: this.workoutSets,
    }]);
  }
}
