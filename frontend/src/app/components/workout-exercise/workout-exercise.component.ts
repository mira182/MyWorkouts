import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkoutExercise} from "../../model/workout-exercise/workoutExercise";
import {CommonModule, JsonPipe, NgForOf, NgSwitchCase} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardSubtitle} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
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
import {API_DATE_FORMAT} from "../../app.config";

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
    MatCard,
    DatePickerComponent,
    MatFormFieldModule,
    WorkoutSetsComponent
  ],
  templateUrl: './workout-exercise.component.html',
})
export class WorkoutExerciseComponent implements OnInit {

  @Input()
  public workoutExercise: WorkoutExercise;

  @Input()
  public workoutDate: string;

  @Output()
  public workoutExerciseUpdated: EventEmitter<void> = new EventEmitter<void>();

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
  protected get date(): FormControl {
    return this.form.get('date') as FormControl;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [this.workoutExercise.id],
      date: [ moment(this.workoutDate).format(API_DATE_FORMAT) ],
      exercise: [ this.workoutExercise?.exercise, Validators.required ],
    });

    this.form.disable();
  }

  protected workoutExerciseDateUpdated(date: Moment): void {
    this.date.setValue(date.format(API_DATE_FORMAT));
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
          this.workoutExerciseUpdated.emit();
          this.snackBarService.showSuccessSnackBar('ALERT.deleted-successfully');
        },
        error: err => {
          this.snackBarService.showErrorSnackBar(err);
        },
      });
  }
}
