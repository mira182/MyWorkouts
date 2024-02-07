import {Injectable} from '@angular/core';
import {
  AddWorkoutExerciseDialogComponent
} from '../../components/dialogs/add-workout-dialog/add-workout-exercise-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../../components/dialogs/confirmation-dialog/confirmation-dialog.component";
import {DateDialogComponent} from "../../components/dialogs/date-dialog/date-dialog.component";
import {
  EditExerciseDialogComponent
} from "../../components/dialogs/edit-exercise-dialog/edit-exercise-dialog.component";
import {CreateTrainingComponent} from "../../components/dialogs/create-training/create-training.component";
import {
  CreateExerciseDialogComponent
} from "../../components/dialogs/create-exercise-dialog/create-exercise-dialog.component";
import {Exercise} from "../../model/exercise/exercise";

@Injectable({
  providedIn: 'root'
})
export class DialogsHandlerService {

  constructor(private readonly dialog: MatDialog) { }

  public openAddWorkoutExerciseDialog(data?: any): MatDialogRef<AddWorkoutExerciseDialogComponent> {
    return this.dialog.open(AddWorkoutExerciseDialogComponent, {
      height: 'auto',
      width: '590px',
      hasBackdrop: true,
      disableClose: true,
      data: data
    });
  }

  public openCreateTrainingPlan(): MatDialogRef<CreateTrainingComponent> {
    return this.dialog.open(CreateTrainingComponent, {
      height: 'auto',
      width: '400px',
      hasBackdrop: true
    });
  }

  public openCreateExerciseDialog(): MatDialogRef<CreateExerciseDialogComponent> {
    return this.dialog.open(CreateExerciseDialogComponent, {
      height: 'auto',
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
    });
  }

  public openEditExerciseDialog(exercise: Exercise) {
    return this.dialog.open(EditExerciseDialogComponent, {
      height: 'auto',
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        exercise: exercise,
      }
    });
  }

  openDateDialog() {
    return this.dialog.open(DateDialogComponent, {
      height: 'auto',
      width: '300px',
      hasBackdrop: true
    });
  }

  openDeleteConfirmationDialog(message: string) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: message
    });
  }
}
