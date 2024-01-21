import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertSnackBarComponent} from "../../components/dialogs/alert-snack-bar/alert-snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  public showSuccessSnackBar(message : string) {
    this.snackBar.openFromComponent(AlertSnackBarComponent, {data: {message: message}, verticalPosition: "bottom", panelClass: "alert-success", duration: 2000});
  }

  public showErrorSnackBar(message : string, errorMessage?: string) {
    this.snackBar.openFromComponent(AlertSnackBarComponent, {data: {message: message, errorMessage: errorMessage}, verticalPosition: "bottom", panelClass: "alert-danger", duration: 2000});
  }
}
