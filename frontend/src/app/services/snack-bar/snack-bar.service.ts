import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertSnackBarComponent} from "../../components/dialogs/alert-snack-bar/alert-snack-bar.component";
import {CustomErrorResponse} from "../../model/error/error.model";
import {isNil} from "lodash";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  public showSuccessSnackBar(message : string) {
    this.snackBar.openFromComponent(AlertSnackBarComponent, {data: { message }, verticalPosition: "bottom", panelClass: "alert-success", duration: 2000});
  }

  public showErrorSnackBar(error: CustomErrorResponse) {
    this.snackBar.openFromComponent(AlertSnackBarComponent, {data: { error }, verticalPosition: "bottom", panelClass: "alert-danger", duration: 2000});
  }

  public showErrorMessageSnackBar(errorMessage: string) {
    this.snackBar.openFromComponent(AlertSnackBarComponent, {data: { errorMessage }, verticalPosition: "bottom", panelClass: "alert-danger", duration: 2000});
  }
}
