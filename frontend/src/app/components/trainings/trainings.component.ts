import {ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TrainingService} from "../../services/rest/training/training.service";
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DialogsHandlerService} from "../../services/dialogs-handler/dialogs-handler.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AppComponent} from "../../app.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatProgressBar} from "@angular/material/progress-bar";
import {filter, finalize, switchMap, take} from "rxjs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {PageHeaderLayoutComponent} from "../layouts/page-header-layout/page-header-layout.component";
import {WorkoutSetsComponent} from "../workout-sets/workout-sets.component";
import {TrainingExercise} from "../../model/training/trainingExercise";
import {DateTimeService} from "../../services/date-time/date-time.service";
import moment from "moment";

@Component({
    selector: 'app-trainings',
    templateUrl: './trainings.component.html',
    styleUrls: ['./trainings.component.scss'],
    imports: [
        MatExpansionModule,
        TranslateModule,
        CommonModule,
        MatFormFieldModule,
        MatIcon,
        MatSelectModule,
        MatIconButton,
        MatInput,
        MatDatepickerToggle,
        MatDatepicker,
        MatCheckbox,
        MatProgressBar,
        MatButton,
        MatMiniFabButton,
        MatTooltipModule,
        MatProgressSpinner,
        MatDatepickerModule,
        ReactiveFormsModule,
        PageHeaderLayoutComponent,
        WorkoutSetsComponent,
    ]
})
export class TrainingsComponent implements OnInit {

  protected form: FormGroup;

  trainingTime;

  loading = signal(false);

  workoutsLoading = signal(false);

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private trainingService: TrainingService,
              private snackBar: SnackBarService,
              private translate: TranslateService,
              private dialogsHandler: DialogsHandlerService,
              private cdr: ChangeDetectorRef,
              private spinner: NgxSpinnerService) {
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      trainingPlans: this.formBuilder.array([])
    });
    this.initForm();
  }

  protected get trainingPlans(): FormArray {
    return this.form.get('trainingPlans') as FormArray;
  }

  protected get weekDays() {
    return AppComponent.weekDays;
  }

  protected readonly formatDate = DateTimeService.formatDate;

  initForm() {
    this.loading.set(true);

    this.trainingService.getAllTrainingsWithoutWorkouts()
      .pipe(
        finalize(() => this.loading.set(false)),
        take(1),
      )
      .subscribe(trainingPlans => {
        this.trainingPlans.clear();
        trainingPlans.forEach(trainingPlan => {
          this.trainingTime = trainingPlan.trainingTime;
          this.trainingPlans.push(this.formBuilder.group({
            id: [trainingPlan.id],
            name: [trainingPlan.name],
            trainingDay: [trainingPlan.trainingDay],
            trainingTime: [trainingPlan.trainingTime ? trainingPlan.trainingTime.substr(0, 5) : ""],
            scheduled: [trainingPlan.scheduled],
            startDate: [moment(trainingPlan.startDate)],
            trainingExercises: this.formBuilder.array([]),
            exercisesLoaded: [false]
          }));
        });
      });
  }

  updateTraining(trainingId, training) {
    const value = training.getRawValue();
    const payload: any = {
      id: value.id,
      name: value.name,
      trainingDay: value.trainingDay,
      trainingTime: value.trainingTime,
      scheduled: value.scheduled,
      startDate: value.startDate ? moment(value.startDate).format('YYYY-MM-DD') : null,
    };

    if (value.exercisesLoaded) {
      payload.trainingExercises = (value.trainingExercises || []).map(trainingExercise => ({
        exercise: trainingExercise.exercise,
        trainingSets: (trainingExercise.workoutSets ?? trainingExercise.trainingSets ?? []).map(set => ({
          reps: set.reps,
          weight: set.weight,
          duration: set.duration,
          distance: set.distance,
        })),
      }));
    }

    this.trainingService.updateTraining(trainingId, payload)
      .pipe(take(1))
      .subscribe({
        next: () => this.snackBar.showSuccessSnackBar('ALERT.successfully-updated'),
        error: err => this.snackBar.showErrorSnackBar(err),
      });

    this.form.markAsPristine();
    this.form.disable();
  }

  deleteTraining(training) {
    this.dialogsHandler.openDeleteConfirmationDialog("Do you really want to delete training?")
      .afterClosed().subscribe(yes => {
      if (yes) {
        this.spinner.show();
        this.trainingService.deleteTraining(training.value.id).subscribe(trainingDeleted => {
          if (trainingDeleted) {
            this.spinner.hide();
            this.initForm();
            this.snackBar.showSuccessSnackBar('ALERT.deleted-successfully');
          }
        }, error => {
          this.spinner.hide();
          this.snackBar.showErrorSnackBar(error);
        });
      }
    });
  }

  addExerciseToTraining(trainingIndex: number) {
    const trainingControl = this.trainingPlans.at(trainingIndex);
    const trainingId = trainingControl.get('id').value;
    if (!trainingId) {
      return;
    }

    this.dialogsHandler.openAddWorkoutExerciseDialog().afterClosed()
      .pipe(
        filter(workoutExercise => !!workoutExercise),
        switchMap(workoutExercise => this.trainingService.addExerciseToTraining(trainingId, {
          exercise: workoutExercise.exercise,
          trainingSets: workoutExercise.workoutSets,
        })),
        take(1),
      )
      .subscribe({
        next: training => {
          this.setTrainingExercises(trainingControl, training.trainingExercises);
          this.snackBar.showSuccessSnackBar('ALERT.successfully-saved');
        },
        error: err => this.snackBar.showErrorSnackBar(err),
      });
  }

  protected addTraining() {
    this.dialogsHandler.openCreateTrainingPlan().afterClosed()
      .pipe(
        filter(confirm => confirm),
        take(1)
      )
      .subscribe(() => {
        this.initForm();
      });
  }

  logTraining(trainingFromGroup) {
    this.dialogsHandler.openDateDialog().afterClosed().subscribe(selectedDate => {
      if (selectedDate) {
        this.spinner.show();
        this.trainingService.applyTraining(trainingFromGroup.value.id, selectedDate)
          .pipe(finalize(() => this.spinner.hide()))
          .subscribe(ok => {
          if (ok) {
            this.snackBar.showSuccessSnackBar(this.translate.instant("ALERT.successfully-saved"));
          }
        }, error => {
          this.snackBar.showErrorSnackBar(error);
        });
      }
    });
  }

  getWorkoutsForTraining(trainingIndex: number) {
    const trainingControl = this.trainingPlans.at(trainingIndex);
    const trainingId = trainingControl.get('id').value;
    if (!trainingId) {
      return;
    }

    this.workoutsLoading.set(true);
    this.trainingService.getTrainingWithWorkouts(trainingId)
      .pipe(
        finalize(() => this.workoutsLoading.set(false)),
        take(1),
      )
      .subscribe({
        next: training => this.setTrainingExercises(trainingControl, training.trainingExercises),
        error: err => this.snackBar.showErrorSnackBar(err),
      });
  }

  // Rebuilds a training plan's exercises as a FormArray of {exercise, trainingSets}
  // groups so each one can drive its own WorkoutSetsComponent.
  private setTrainingExercises(trainingControl: AbstractControl, exercises: TrainingExercise[]): void {
    const exercisesArray = trainingControl.get('trainingExercises') as FormArray;
    exercisesArray.clear();
    (exercises || []).forEach(trainingExercise => exercisesArray.push(this.formBuilder.group({
      id: [trainingExercise.id],
      exercise: [trainingExercise.exercise],
      trainingSets: [trainingExercise.trainingSets || []],
    })));
    trainingControl.get('exercisesLoaded').setValue(true);
    this.cdr.markForCheck();
  }

  protected removeTrainingExercise(trainingControl: AbstractControl, exerciseIndex: number): void {
    (trainingControl.get('trainingExercises') as FormArray).removeAt(exerciseIndex);
    this.form.markAsDirty();
  }

}
