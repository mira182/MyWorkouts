import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PageHeaderLayoutComponent} from "../layouts/page-header-layout/page-header-layout.component";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Exercise} from "../../model/exercise/exercise";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatExpansionPanelActionRow} from "@angular/material/expansion";
import {TranslateModule} from "@ngx-translate/core";
import {Urls} from "../../model/urls";
import {DialogsHandlerService} from "../../services/dialogs-handler/dialogs-handler.service";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {ExerciseHelperService} from "../../services/exercise-helper/exercise-helper.service";
import {filter, mergeMap, switchMap, take} from "rxjs";
import {isNil} from "lodash";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDivider} from "@angular/material/divider";
import {ExpansionPanelComponent} from "../expansion-panel/expansion-panel.component";
import {ExerciseService} from "../../services/rest/exercise/exercise.service";

@Component({
  selector: 'app-exercise-item',
  standalone: true,
  imports: [
    PageHeaderLayoutComponent,
    NgIf,
    MatIcon,
    MatButton,
    MatExpansionPanelActionRow,
    TranslateModule,
    MatIconButton,
    MatTooltip,
    MatDivider,
    ExpansionPanelComponent
  ],
  templateUrl: './exercise-item.component.html',
})
export class ExerciseItemComponent {

  @Input()
  public exercise: Exercise;

  protected readonly IMAGE_BASE_URL = Urls.IMAGE_BASE_URL;

  @Output()
  public exerciseEdited = new EventEmitter<Exercise>();

  constructor(private readonly dialogsHandler: DialogsHandlerService,
              private readonly exerciseService: ExerciseService,
              private readonly snackBarService: SnackBarService,
              protected readonly exerciseHelper: ExerciseHelperService) {
  }

  public editExercise() {
    this.dialogsHandler.openEditExerciseDialog(this.exercise).afterClosed()
      .pipe(
        filter(result => !isNil(result)),
        mergeMap(result => this.exerciseService.updateExercise(result.exercise, result.exercise.id, result.imageFile)),
        take(1)
      )
      .subscribe({
        next: exercise => {
            this.exerciseEdited.emit(exercise);
            this.snackBarService.showSuccessSnackBar('ALERT.successfully-saved');
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
    });
  }

  protected deleteExercise() {
    this.dialogsHandler.openDeleteConfirmationDialog('MESSAGES.delete-exercise-question').afterClosed()
      .pipe(
        filter(confirm => confirm),
        switchMap(()  => this.exerciseService.deleteExercise(this.exercise.id)),
        take(1),
      )
      .subscribe({
        next: () => {
          this.exerciseEdited.emit(this.exercise);
          this.snackBarService.showSuccessSnackBar('ALERT.deleted-successfully');
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }
}
