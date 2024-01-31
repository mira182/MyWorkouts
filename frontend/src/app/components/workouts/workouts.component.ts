import {Component, Input, signal, Signal, WritableSignal} from '@angular/core';
import moment, {Moment} from "moment";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {MatMiniFabButton} from "@angular/material/button";
import {DaySelectComponent} from "../day-select/day-select.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgxSpinnerService} from "ngx-spinner";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {WorkoutService} from "../../services/rest/workout/workout.service";
import {DialogsHandlerService} from "../../services/dialogs-handler/dialogs-handler.service";
import {finalize, mergeMap, take} from "rxjs";
import {Workout} from "../../model/workout/workout";
import {isNil} from "lodash";
import {WorkoutsHandlerComponent} from "../workouts-handler/workouts-handler.component";

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
    WorkoutsHandlerComponent
  ],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.scss',
})
export class WorkoutsComponent {

  @Input()
  public workout: Workout;

  protected selectedDate: WritableSignal<Moment> = signal(moment());

  protected loading: boolean = false;

  constructor(private readonly snackBarService: SnackBarService,
              private readonly workoutService: WorkoutService,
              private readonly dialogsHandler: DialogsHandlerService,
              private readonly spinner: NgxSpinnerService,) {
  }

  protected openAddWorkoutDialog() {
    this.spinner.show();

    this.dialogsHandler.openAddWorkoutExerciseDialog().afterClosed()
      .pipe(
        mergeMap(workoutExercise => this.workoutService.createWorkout({
          date: this.selectedDate().startOf('day'),
          note: 'test note',
          workoutExercises: [ workoutExercise ],
        })),
        finalize(() => this.spinner.hide()),
        take(1),
      )
      .subscribe({
        next: workout => {
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
  }

  protected deleteAllWorkouts() {
    this.dialogsHandler.openDeleteConfirmationDialog("Do you really want to delete all workouts?").afterClosed().subscribe(yes => {
      if (yes && !isNil(this.workout.id)) {
        this.workoutService.deleteWorkout(this.workout.id).subscribe(() => {
          this.getWorkoutsForDay(this.selectedDate());
        });
      }
    })
  }

  public today() {
    this.selectedDate.set(moment());
  }
}
