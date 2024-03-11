import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import moment, {Moment} from "moment";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {MatMiniFabButton} from "@angular/material/button";
import {DaySelectComponent} from "../day-select/day-select.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
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

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatTooltip,
    TranslateModule,
    MatMiniFabButton,
    DaySelectComponent,
    MatProgressSpinner,
    NgxSpinnerModule,
    WorkoutExerciseComponent,
    PageHeaderLayoutComponent
  ],
  templateUrl: './workouts.component.html',
})
export class WorkoutsComponent extends Unsubscribe implements OnInit {

  public workout: Workout;

  protected selectedDate: WritableSignal<Moment> = signal(moment());

  constructor(private readonly snackBarService: SnackBarService,
              private readonly workoutService: WorkoutService,
              private readonly dialogsHandler: DialogsHandlerService,
              private readonly spinner: NgxSpinnerService,
              private readonly workoutDayService: WorkoutDayService) {
    super();
  }

  public ngOnInit(): void {
    this.workoutDayService.getWorkoutDay
      .pipe(
        debounceTime(200),
        tap(() => this.spinner.show()),
        switchMap(date => this.workoutService.getWorkoutForDay(date)),
        takeUntil(this.unSubscribe),
      )
      .subscribe({
        next: workout => {
          this.workout = workout;
          this.spinner.hide();
        },
        error: err => {
          this.snackBarService.showErrorSnackBar(err);
          this.spinner.hide();
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
          this.workout = workout;
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
    if (!this.workout?.id) {
      this.snackBarService.showErrorMessageSnackBar('ALERT.workout-id-missing');
    }

    this.dialogsHandler.openDeleteConfirmationDialog("Do you really want to delete workout?").afterClosed()
      .pipe(
        filter(confirm => confirm),
        switchMap(() => this.workoutService.deleteWorkout(this.workout.id!)),
        take(1),
      )
      .subscribe({
        next: () => this.snackBarService.showSuccessSnackBar('ALERT.deleted-successfully'),
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  public today() {
    this.selectedDate.set(moment());
  }

  protected onWorkoutExerciseUpdated(): void {
    this.getWorkoutsForDay(this.selectedDate());
  }
}
