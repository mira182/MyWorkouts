import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {AppDatePipe} from "../../pipes/app-date.pipe";
import {WorkoutExercise} from "../../model/workout-exercise/workoutExercise";
import {ExerciseStats} from "../../model/exercise/exercise-stats";
import {WorkoutSet} from "../../model/exercise/workoutSet";
import {ExerciseService} from "../../services/rest/exercise/exercise.service";

import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardSubtitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {DialogsHandlerService} from "../../services/dialogs-handler/dialogs-handler.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import moment, {Moment} from "moment";
import {WorkoutExerciseService} from "../../services/rest/workout-exercise/workout-exercise.service";
import {filter, finalize, switchMap, take, tap} from "rxjs";
import {DatePickerComponent} from "../date-picker/date-picker.component";
import {WorkoutSetsComponent} from "../workout-sets/workout-sets.component";
import {DATE_FORMATS} from "../../config/date-formats";

@Component({
    selector: 'workout-exercise',
    imports: [
    FormsModule,
    MatCardContent,
    MatCardSubtitle,
    MatDivider,
    MatIcon,
    MatIconButton,
    MatTooltip,
    ReactiveFormsModule,
    TranslateModule,
    MatCard,
    DatePickerComponent,
    MatFormFieldModule,
    WorkoutSetsComponent,
    AppDatePipe,
    DecimalPipe
],
    templateUrl: './workout-exercise.component.html'
})
export class WorkoutExerciseComponent implements OnInit {

  @Input()
  public workoutExercise: WorkoutExercise;

  @Input()
  public workoutDate: string;

  @Output()
  public workoutExerciseUpdated: EventEmitter<void> = new EventEmitter<void>();

  protected form: FormGroup;

  protected stats = signal<ExerciseStats | undefined>(undefined);

  constructor(private readonly formBuilder: FormBuilder,
              private readonly dialogsHandler: DialogsHandlerService,
              private readonly spinner: NgxSpinnerService,
              private readonly snackBarService: SnackBarService,
              private readonly workoutExerciseService: WorkoutExerciseService,
              private readonly exerciseService: ExerciseService) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.loadStats();
  }

  // "Last time" + personal records for this exercise (previous sessions before this workout).
  private loadStats(): void {
    const exerciseId = this.workoutExercise?.exercise?.id;
    if (exerciseId == null) {
      return;
    }
    this.exerciseService.getExerciseStats(exerciseId, this.workoutDate)
      .pipe(take(1))
      .subscribe({
        next: stats => this.stats.set(stats),
        error: () => {}, // stats are non-critical decoration; ignore failures silently
      });
  }

  protected openHistory(): void {
    this.dialogsHandler.openExerciseHistoryDialog(this.workoutExercise.exercise);
  }

  protected formatSet(set: WorkoutSet): string {
    if (set.weight > 0) {
      return `${set.weight}×${set.reps}`;
    }
    if (set.reps > 0) {
      return `${set.reps} reps`;
    }
    if (set.duration > 0) {
      return `${set.duration}s`;
    }
    return '–';
  }
  protected get date(): FormControl {
    return this.form.get('date') as FormControl;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [this.workoutExercise.id],
      date: [ moment(this.workoutDate).format(DATE_FORMATS.apiDate) ],
      exercise: [ this.workoutExercise?.exercise, Validators.required ],
    });

    this.form.disable();
  }

  protected workoutExerciseDateUpdated(date: Moment): void {
    this.date.setValue(date.format(DATE_FORMATS.apiDate));
  }

  protected updateWorkoutExercise() {
    this.spinner.show();

    this.workoutExerciseService.updateWorkoutExercise(this.form.value)
      .pipe(
        finalize(() => this.spinner.hide()),
        take(1),
      )
      .subscribe({
        next: () => {
          this.snackBarService.showSuccessSnackBar('ALERT.successfully-updated');
          this.workoutExerciseUpdated.emit();
          this.form.disable();
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected deleteWorkoutExercise() {
    this.dialogsHandler.openDeleteConfirmationDialog('MESSAGES.delete-workout-exercise-question').afterClosed()
      .pipe(
        filter(confirm => confirm),
        switchMap(() => this.workoutExerciseService.deleteWorkoutExercise(this.workoutExercise.id)),
        tap(() => this.spinner.show()),
        finalize(() => this.spinner.hide()),
        take(1),
      )
      .subscribe({
        next: () => {
          this.workoutExerciseUpdated.emit();
          this.snackBarService.showSuccessSnackBar('ALERT.deleted-successfully');
        },
        error: err => {
          this.snackBarService.showErrorSnackBar(err);
        },
      });
  }
}
