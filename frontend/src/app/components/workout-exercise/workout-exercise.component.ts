import {Component, Input, OnInit} from '@angular/core';
import {WorkoutExercise} from "../../model/exercise/workoutExercise";
import {CommonModule, JsonPipe, NgForOf, NgSwitchCase} from "@angular/common";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {WorkoutSet} from "../../model/exercise/workoutSet";
import {MatCard, MatCardContent, MatCardSubtitle} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {DialogsHandlerService} from "../../services/dialogs-handler/dialogs-handler.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import moment from "moment";
import {WorkoutExerciseService} from "../../services/rest/workout-exercise/workout-exercise.service";
import {filter, finalize, switchMap, take, tap} from "rxjs";

@Component({
  selector: 'app-workout-exercise',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JsonPipe,
    MatCardContent,
    MatCardSubtitle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDivider,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatTooltip,
    NgForOf,
    NgSwitchCase,
    ReactiveFormsModule,
    TranslateModule,
    MatCard
  ],
  templateUrl: './workout-exercise.component.html',
})
export class WorkoutExerciseComponent implements OnInit {

  @Input()
  public workoutExercise: WorkoutExercise;

  protected form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly dialogsHandler: DialogsHandlerService,
              private readonly spinner: NgxSpinnerService,
              private readonly snackBarService: SnackBarService,
              private readonly workoutExerciseService: WorkoutExerciseService) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  protected get workoutSets(): FormArray {
    return this.form.get('workoutSets') as FormArray;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [this.workoutExercise.id],
      date: [ moment().format('yyyy-MM-DD') ],
      exercise: [ this.workoutExercise?.exercise ],
      workoutSets: this.formBuilder.array([])
    });

    this.initWorkoutSets(this.workoutExercise?.workoutSets);
    this.form.disable();
  }

  private initWorkoutSets(workoutSets: WorkoutSet[]) {
    workoutSets.forEach(set => {
      this.workoutSets.push(this.formBuilder.group({
        weight: new FormControl({value: set.weight, disabled: true}, Validators.required),
        reps: new FormControl({value: set.reps, disabled: true}, Validators.required),
        distance: new FormControl({value: set.distance, disabled: true}, Validators.required),
        durationMin: new FormControl({value: Math.floor(set.duration / 60), disabled: true}, Validators.required),
        durationSec: new FormControl({value: set.duration % 60, disabled: true}, Validators.required)
      }));
    });
  }

  protected addWorkoutSet(): void {
    this.workoutSets.push(this.formBuilder.group({
      weight: new FormControl(0, Validators.required),
      reps: new FormControl(0, Validators.required),
      distance: new FormControl(0, Validators.required),
      durationMin: new FormControl(0, Validators.required),
      durationSec: new FormControl(0, Validators.required)
    }));
  }

  protected saveWorkout() {
    this.spinner.show();

    console.log(this.form.value);

    this.workoutExerciseService.updateWorkoutExercise(this.form.value)
      .pipe(
        finalize(() => this.spinner.hide()),
        take(1),
      )
      .subscribe({
        next: () => {
          this.snackBarService.showSuccessSnackBar('ALERT.successfully-updated');
          this.form.disable();
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected deleteWorkoutExercise() {
    this.dialogsHandler.openDeleteConfirmationDialog("Do you really want to delete workout?").afterClosed()
      .pipe(
        filter(confirm => confirm),
        switchMap(() => this.workoutExerciseService.deleteWorkoutExercise(this.workoutExercise.id)),
        tap(() => this.spinner.show()),
        finalize(() => this.spinner.hide()),
        take(1),
      )
      .subscribe({
        next: () => {
          this.snackBarService.showSuccessSnackBar('ALERT.deleted-successfully');
        },
        error: err => {
          this.snackBarService.showErrorSnackBar(err);
        },
      });
  }
}
