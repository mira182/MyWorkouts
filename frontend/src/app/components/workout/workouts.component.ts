import {Component, computed, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
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
import {debounceTime, filter, finalize, map, mergeMap, switchMap, take, takeUntil, tap} from "rxjs";
import {Workout} from "../../model/workout/workout";
import {WorkoutExercise} from "../../model/workout-exercise/workoutExercise";
import {FitWorkout} from "../../model/workout/fit-workout";
import {isNil} from "lodash";
import {WorkoutExerciseComponent} from "../workout-exercise/workout-exercise.component";
import {PageHeaderLayoutComponent} from "../layouts/page-header-layout/page-header-layout.component";
import {Unsubscribe} from "../unsubscribe/unsubscribe";
import {WorkoutDayService} from "../../services/rest/workout/workout-day.service";
import {EmptyStateComponent} from "../empty-state/empty-state.component";
import {SkeletonComponent} from "../skeleton/skeleton.component";
import {DATE_FORMATS} from "../../config/date-formats";
import {SwipeDirective} from "../../directives/swipe.directive";

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
    SkeletonComponent,
    SwipeDirective,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput
],
    templateUrl: './workouts.component.html'
})
export class WorkoutsComponent extends Unsubscribe implements OnInit {

  protected readonly DATE_FORMATS = DATE_FORMATS;

  public workout = signal<Workout | undefined>(undefined);

  protected readonly currentWorkout = computed(() => {
    const w = this.workout();
    return w?.workoutExercises?.length ? w : undefined;
  });

  protected selectedDate: WritableSignal<Moment> = signal(moment());

  protected trainings = signal<TrainingPlan[]>([]);

  protected dayLoading = signal(false);

  protected readonly noteControl = new FormControl('');

  private readonly syncNote = effect(() => {
    this.noteControl.setValue(this.workout()?.note ?? '', {emitEvent: false});
  });

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

  protected onFitFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith('.fit')) {
      this.snackBarService.showErrorMessageSnackBar('ALERT.invalid-fit-file');
      return;
    }

    this.spinner.show();
    this.workoutService.importFitFile(file)
      .pipe(
        finalize(() => this.spinner.hide()),
        take(1),
      )
      .subscribe({
        next: draft => this.reviewFitDraft(draft),
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  private reviewFitDraft(draft: FitWorkout): void {
    this.dialogsHandler.openFitImportReviewDialog(draft).afterClosed()
      .pipe(
        filter((result): result is { date: string; workoutExercises: WorkoutExercise[] } =>
          !isNil(result) && result.workoutExercises.length > 0),
        mergeMap(result => this.workoutService.createWorkout({
          date: result.date,
          note: '',
          workoutExercises: result.workoutExercises,
        }).pipe(map(() => result.date))),
        tap(() => this.spinner.show()),
        finalize(() => this.spinner.hide()),
        take(1),
      )
      .subscribe({
        next: date => {
          this.snackBarService.showSuccessSnackBar('ALERT.successfully-saved');
          this.getWorkoutsForDay(moment(date));
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected copyLastWorkout(): void {
    this.spinner.show();
    this.workoutService.copyLastWorkout(this.selectedDate())
      .pipe(
        finalize(() => this.spinner.hide()),
        take(1),
      )
      .subscribe({
        next: workout => {
          this.workout.set(workout);
          this.snackBarService.showSuccessSnackBar('ALERT.successfully-saved');
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected applyTemplate(training: TrainingPlan): void {
    this.spinner.show();
    this.trainingService.applyTraining(training.id, this.selectedDate().toDate())
      .pipe(
        finalize(() => this.spinner.hide()),
        take(1),
      )
      .subscribe({
        next: () => {
          this.snackBarService.showSuccessSnackBar('ALERT.successfully-saved');
          this.getWorkoutsForDay(this.selectedDate()); // reloads the day's workout
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected openAddWorkoutExerciseDialog() {
    this.dialogsHandler.openAddWorkoutExerciseDialog().afterClosed()
      .pipe(
        filter((workoutExercises: WorkoutExercise[]) => !isNil(workoutExercises) && workoutExercises.length > 0),
        mergeMap((workoutExercises: WorkoutExercise[]) => this.workoutService.createWorkout({
          date: this.selectedDate().format(DATE_FORMATS.apiDate),
          note: '',
          workoutExercises: workoutExercises,
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

    this.dialogsHandler.openDeleteConfirmationDialog('MESSAGES.delete-workout-question').afterClosed()
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

  protected nextDay(): void {
    this.getWorkoutsForDay(this.selectedDate().clone().add(1, 'day'));
  }

  protected previousDay(): void {
    this.getWorkoutsForDay(this.selectedDate().clone().subtract(1, 'day'));
  }

  protected saveNote(): void {
    const workout = this.workout();
    const note = this.noteControl.value ?? '';
    if (!workout?.id || note === (workout.note ?? '')) {
      return;
    }
    this.workoutService.updateNote(workout.id, note)
      .pipe(take(1))
      .subscribe({
        next: () => workout.note = note,
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected onWorkoutExerciseUpdated(): void {
    this.getWorkoutsForDay(this.selectedDate());
  }
}
