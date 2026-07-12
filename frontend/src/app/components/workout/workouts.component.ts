import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import moment, {Moment} from "moment";

import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {DaySelectComponent} from "../day-select/day-select.component";
import {TrainingService} from "../../services/rest/training/training.service";
import {TrainingPlan} from "../../model/training/trainingPlan";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {WorkoutService} from "../../services/rest/workout/workout.service";
import {DialogsHandlerService} from "../../services/dialogs-handler/dialogs-handler.service";
import {debounceTime, filter, finalize, mergeMap, switchMap, take, takeUntil, tap} from "rxjs";
import {Workout} from "../../model/workout/workout";
import {isNil} from "lodash";
import {API_DATE_FORMAT} from "../../app.config";
import {WorkoutExerciseComponent} from "../workout-exercise/workout-exercise.component";
import {PageHeaderLayoutComponent} from "../layouts/page-header-layout/page-header-layout.component";
import {Unsubscribe} from "../unsubscribe/unsubscribe";
import {WorkoutDayService} from "../../services/rest/workout/workout-day.service";
import {EmptyStateComponent} from "../empty-state/empty-state.component";
import {SkeletonComponent} from "../skeleton/skeleton.component";

@Component({
    selector: 'app-workouts',
    imports: [
    MatIcon,
    MatTooltip,
    TranslateModule,
    MatButton,
    MatMiniFabButton,
    MatMenuModule,
    DaySelectComponent,
    NgxSpinnerModule,
    WorkoutExerciseComponent,
    PageHeaderLayoutComponent,
    EmptyStateComponent,
    SkeletonComponent
],
    templateUrl: './workouts.component.html'
})
export class WorkoutsComponent extends Unsubscribe implements OnInit {

  public workout = signal<Workout | undefined>(undefined);

  protected selectedDate: WritableSignal<Moment> = signal(moment());

  protected trainings = signal<TrainingPlan[]>([]);

  protected dayLoading = signal(false);

  constructor(private readonly snackBarService: SnackBarService,
              private readonly workoutService: WorkoutService,
              private readonly trainingService: TrainingService,
              private readonly dialogsHandler: DialogsHandlerService,
              private readonly spinner: NgxSpinnerService,
              private readonly workoutDayService: WorkoutDayService) {
    super();
  }

  public ngOnInit(): void {
    this.workoutDayService.getWorkoutDay
      .pipe(
        debounceTime(200),
        tap(() => this.dayLoading.set(true)),
        switchMap(date => this.workoutService.getWorkoutForDay(date).pipe(
          finalize(() => this.dayLoading.set(false)),
        )),
        takeUntil(this.unSubscribe),
      )
      .subscribe({
        next: workout => {
          this.workout.set(workout ?? undefined);
        },
        error: err => {
          this.workout.set(undefined);
          this.snackBarService.showErrorSnackBar(err);
        },
      });

    this.loadTrainingTemplates();
  }

  private loadTrainingTemplates(): void {
    this.trainingService.getAllTrainingsWithoutWorkouts()
      .pipe(take(1))
      .subscribe({
        next: trainings => this.trainings.set(trainings),
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected applyTemplate(training: TrainingPlan): void {
    this.spinner.show();
    this.trainingService.applyTraining(training.id, this.selectedDate().toDate())
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.snackBarService.showSuccessSnackBar('ALERT.successfully-saved');
          this.getWorkoutsForDay(this.selectedDate()); // reloads the day's workout
        },
        error: err => {
          this.spinner.hide();
          this.snackBarService.showErrorSnackBar(err);
        },
      });
  }

  protected openAddWorkoutExerciseDialog() {
    this.dialogsHandler.openAddWorkoutExerciseDialog().afterClosed()
      .pipe(
        filter((workoutExercise) => !isNil(workoutExercise)),
        // TODO change create to add workoutExercise to workout with some ID
        mergeMap(workoutExercise => this.workoutService.createWorkout({
          date: this.selectedDate().format(API_DATE_FORMAT),
          note: 'test note',
          workoutExercises: [ workoutExercise ],
        })),
        tap(() => this.spinner.show()),
        finalize(() => this.spinner.hide()),
        take(1),
      )
      .subscribe({
        next: (workout) => {
          this.workout.set(workout);
          this.snackBarService.showSuccessSnackBar('ALERT.successfully-saved');
        },
        error: err => {
          this.snackBarService.showErrorSnackBar(err);
        },
      });
  }

  protected getWorkoutsForDay(date: Moment) {
    this.selectedDate.set(date);
    this.workoutDayService.setWorkoutDay(date);
  }

  protected deleteWorkout() {
    const workoutId = this.workout()?.id;
    if (!workoutId) {
      this.snackBarService.showErrorMessageSnackBar('ALERT.workout-id-missing');
      return;
    }

    this.dialogsHandler.openDeleteConfirmationDialog("Do you really want to delete workout?").afterClosed()
      .pipe(
        filter(confirm => confirm),
        switchMap(() => this.workoutService.deleteWorkout(workoutId)),
        take(1),
      )
      .subscribe({
        next: () => this.snackBarService.showSuccessSnackBar('ALERT.deleted-successfully'),
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  public today() {
    this.getWorkoutsForDay(moment());
  }

  protected onWorkoutExerciseUpdated(): void {
    this.getWorkoutsForDay(this.selectedDate());
  }
}
