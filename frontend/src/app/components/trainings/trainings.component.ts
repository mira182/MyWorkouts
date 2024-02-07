import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TrainingService} from "../../services/rest/training/training.service";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
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
import {filter, finalize, take} from "rxjs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {WorkoutExerciseComponent} from "../workout-exercise/workout-exercise.component";
import {PageHeaderLayoutComponent} from "../layouts/page-header-layout/page-header-layout.component";
import moment from "moment";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  standalone: true,
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
    WorkoutExerciseComponent,
    PageHeaderLayoutComponent,
    NgxMaterialTimepickerModule,
  ]
})
export class TrainingsComponent implements OnInit {

  protected form: FormGroup;

  trainingTime;

  loading: boolean = false;

  workoutsLoading: boolean = false;

  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private trainingService: TrainingService,
              private snackBar: SnackBarService,
              private translate: TranslateService,
              private dialogsHandler: DialogsHandlerService,
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

  initForm() {
    this.loading = true;

    this.trainingService.getTrainingWithWorkouts(1)
      .pipe(
        finalize(() => this.loading = false),
        take(1),
      )
      .subscribe(trainingPlan => {
        // trainingPlans.forEach(trainingPlan => {
          this.trainingTime = trainingPlan.trainingTime;
          this.trainingPlans.push(this.formBuilder.group({
            id: [trainingPlan.id],
            name: [trainingPlan.name],
            trainingDay: [trainingPlan.trainingDay],
            trainingTime: [trainingPlan.trainingTime ? trainingPlan.trainingTime.substr(0, 5) : ""],
            scheduled: [trainingPlan.scheduled],
            startDate: [moment(trainingPlan.startDate)],
            workout: [trainingPlan.workout],
            workoutExercises: this.formBuilder.array([])
          }));
        // });
      });
  }

  updateTraining(trainingId, training) {
    this.trainingService.updateTraining(trainingId, training.value).subscribe(ok => {
      if (ok) {
        this.snackBar.showSuccessSnackBar('ALERT.successfully-updated');
      }
    }, error =>
      this.snackBar.showErrorSnackBar(error)
    );
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

  addWorkoutToTraining(trainingIndex) {
    this.dialogsHandler.openAddWorkoutExerciseDialog().afterClosed().subscribe(workout => {
      if (workout) {
        const trainingId = this.trainingPlans.controls[trainingIndex].get('id');
        this.trainingService.addWorkoutToTraining(trainingId.value, workout).subscribe(updatedTraining => {
          if (updatedTraining) {
            this.snackBar.showSuccessSnackBar('ALERT.successfully-saved');
            this.initForm();
          }
        }, error => {
          this.snackBar.showErrorSnackBar(error);
        });
      }
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
        this.trainingService.applyTraining(trainingFromGroup.value.id, selectedDate).subscribe(ok => {
          if (ok) {
            this.spinner.hide();
            this.snackBar.showSuccessSnackBar(this.translate.instant("ALERT.successfully-saved"));
          }
        }, error => {
          this.spinner.hide();
          this.snackBar.showErrorSnackBar(error);
        });
      }
    });
  }

  getWorkoutsForTraining(trainingIndex) {
    // this.workoutsLoading = true;
    // this.trainingService.getWorkoutsForTraining(this.trainingPlans.at(trainingIndex).get("id").value).subscribe(workouts => {
    //   const workoutsArray = this.trainingPlans.at(trainingIndex).get("workouts") as FormArray;
    //   workoutsArray.clear();
    //   workouts.forEach(workout => {
    //     workoutsArray.push(this.formBuilder.group({
    //
    //     }));
    //     this.workoutFormService.addWorkout(workoutsArray, new WorkoutExercise(workout), true);
    //   });
    //   this.workoutsLoading = false;
    // })
  }

}
