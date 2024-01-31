import {Injectable} from '@angular/core';
import {
  AddWorkoutExerciseDialogComponent
} from '../../components/dialogs/add-workout-dialog/add-workout-exercise-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../../components/dialogs/confirmation-dialog/confirmation-dialog.component";
import {DateDialogComponent} from "../../components/dialogs/date-dialog/date-dialog.component";
import {
  EditExerciseDialogComponent
} from "../../components/dialogs/edit-exercise-dialog/edit-exercise-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogsHandlerService {

  constructor(private readonly dialog: MatDialog) { }

  openAddWorkoutExerciseDialog(data?: any) {
    return this.dialog.open(AddWorkoutExerciseDialogComponent, {
      height: 'auto',
      width: '590px',
      hasBackdrop: true,
      data: data
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

  openEditExerciseDialog(data: any) {
    return this.dialog.open(EditExerciseDialogComponent, {
      height: 'auto',
      width: '400px',
      hasBackdrop: true,
      data: data
    });
  }
}
