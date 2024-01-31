import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {WorkoutExercise} from "../../model/exercise/workoutExercise";
import {WorkoutSet} from "../../model/exercise/workoutSet";
import {WorkoutExerciseService} from "../../services/rest/workout-exercise/workout-exercise.service";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {DialogsHandlerService} from "../../services/dialogs-handler/dialogs-handler.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent, MatCardSubtitle} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {Workout} from "../../model/workout/workout";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-workouts-handler',
  templateUrl: './workouts-handler.component.html',
  styleUrls: ['./workouts-handler.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatIcon,
    MatCardSubtitle,
    MatCard,
    MatIconButton,
    MatTooltip,
    MatDivider,
    MatCardContent,
    MatFormField,
    MatDatepicker,
    MatDatepickerToggle,
    ReactiveFormsModule,
    MatInput,
    MatDatepickerModule,
    MatLabel,
  ]
})
export class WorkoutsHandlerComponent implements OnInit, OnChanges {

  @Input()
  public workout: Workout;

  @Input()
  withDate: boolean = true;

  @Output()
  public workoutUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

  workoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private workoutService: WorkoutExerciseService,
              private snackBar: SnackBarService,
              private translate: TranslateService,
              private dialog: MatDialog,
              private dialogsHandler: DialogsHandlerService,
              private spinner: NgxSpinnerService) {
  }

  public ngOnInit(): void {
    this.init();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // if ('workoutsInput' in changes) {
    //   this.workoutsInput = changes['workoutsInput'].currentValue;
    //   this.init();
    // }
  }

  private init() {
    this.workoutForm = this.formBuilder.group({
      note: [this.workout?.note ? this.workout.note : ''],
      date: [this.workout?.date ? this.workout.date : ''],
      workoutExercises: this.formBuilder.array([])
    });

    this.workoutExercises.clear();
  }

  get workoutExercises() {
    return this.workoutForm.get('workoutExercises') as FormArray;
  }

  protected saveWorkout() {

  }

  protected deleteWorkout(workoutId: number) {
    this.dialogsHandler.openDeleteConfirmationDialog("Do you really want to delete workout?")
      .afterClosed().subscribe(yes => {
      if (yes) {
        this.spinner.show();
        this.workoutService.deleteWorkout(workoutId).subscribe(() => {
          this.spinner.hide();
          this.snackBar.showSuccessSnackBar(this.translate.instant('ALERT.deleted-successfully'));
          this.workoutUpdated.emit(true);
        }, error => {
          this.spinner.hide();
          this.snackBar.showErrorSnackBar(error);
        });
      }
    });
  }

}
