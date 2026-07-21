import {Component, OnInit, signal} from '@angular/core';
import {Exercise} from "../../../model/exercise/exercise";
import {ExerciseService} from "../../../services/rest/exercise/exercise.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ExerciseHelperService} from "../../../services/exercise-helper/exercise-helper.service";
import {ExerciseImageDialogComponent} from "../exercise-image-dialog/exercise-image-dialog.component";
import {LongPressDirective} from "../../../directives/long-press.directive";
import {Urls} from "../../../model/urls";
import {MatStepperModule} from "@angular/material/stepper";

import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatActionList, MatListItem} from "@angular/material/list";
import {take} from "rxjs";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-select-exercise-dialog',
    templateUrl: './select-exercise-dialog.component.html',
    imports: [
    MatStepperModule,
    TranslateModule,
    ReactiveFormsModule,
    MatActionList,
    MatListItem,
    MatButton,
    LongPressDirective
]
})
export class SelectExerciseDialogComponent implements OnInit {

  exercises: Exercise[] = [];

  protected exerciseCategories = signal<string[]>([]);

  exercisesBySelectedCategory = signal<Exercise[]>([]);

  readonly IMAGE_BASE_URL = Urls.IMAGE_BASE_URL;

  private suppressNextClick = false;

  constructor(private readonly exerciseService: ExerciseService,
              protected readonly exerciseHelper: ExerciseHelperService,
              private readonly dialog: MatDialog,
              private readonly dialogRef: MatDialogRef<SelectExerciseDialogComponent>) {
  }

  public ngOnInit(): void {
    this.exerciseService.getAllCategories()
      .subscribe(categories => {
        this.exerciseCategories.set(categories);
      })
  }

  protected setSelectedExercise(exercise: Exercise) {
    if (this.suppressNextClick) {
      this.suppressNextClick = false;
      return;
    }
    this.dialogRef.close(exercise);
  }

  protected showExerciseImage(exercise: Exercise): void {
    this.suppressNextClick = true;
    setTimeout(() => this.suppressNextClick = false, 400);

    this.dialog.open(ExerciseImageDialogComponent, {
      width: '420px',
      maxWidth: '92vw',
      hasBackdrop: true,
      data: exercise,
    });
  }

  protected selectCategory(category: string): void {
    this.exerciseService.getAllExercisesByCategory(category)
      .pipe(
        take(1)
      )
      .subscribe(exercises => {
        this.exercisesBySelectedCategory.set(exercises);
      });
  }
}
