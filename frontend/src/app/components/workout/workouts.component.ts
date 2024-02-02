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
import {filter, finalize, mergeMap, switchMap, take, tap} from "rxjs";
import {Workout} from "../../model/workout/workout";
import {isNil} from "lodash";
import {API_DATE_FORMAT} from "../../app.config";
import {WorkoutExerciseComponent} from "../workout-exercise/workout-exercise.component";

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
    WorkoutExerciseComponent
  ],
  templateUrl: './workouts.component.html',
})
export class WorkoutsComponent implements OnInit {

  public workout: Workout;

  protected selectedDate: WritableSignal<Moment> = signal(moment());

  protected loading: boolean = false;

  constructor(private readonly snackBarService: SnackBarService,
              private readonly workoutService: WorkoutService,
              private readonly dialogsHandler: DialogsHandlerService,
              private readonly spinner: NgxSpinnerService,) {
  }

  public ngOnInit(): void {
    this.getWorkoutForSelectedDay();
  }

  protected openAddWorkoutDialog() {
    this.dialogsHandler.openAddWorkoutExerciseDialog().afterClosed()
      .pipe(
        filter((workoutExercise) => !isNil(workoutExercise)),
        mergeMap(workoutExercise => this.workoutService.createWorkout({
          date: this.selectedDate().format(API_DATE_FORMAT),
          note: 'test note',
          exercises: [ workoutExercise ],
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
    this.loading = true;
    this.selectedDate.set(date);
    this.getWorkoutForSelectedDay();
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

  private getWorkoutForSelectedDay(): void {
    this.spinner.show()

    this.workoutService.getWorkoutForDay(this.selectedDate())
      .pipe(
        take(1),
        finalize(() => this.spinner.hide()),
      )
      .subscribe({
        next: workout => this.workout = workout,
      });
  }
}
