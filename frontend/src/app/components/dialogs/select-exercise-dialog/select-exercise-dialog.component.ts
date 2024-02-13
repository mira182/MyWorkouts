import {Component, OnInit} from '@angular/core';
import {ExerciseHelperService} from "../../../services/exercise-helper/exercise-helper.service";
import {Exercise} from "../../../model/exercise/exercise";
import {ExerciseService} from "../../../services/rest/exercise/exercise.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Urls} from "../../../model/urls";
import {MatStepperModule} from "@angular/material/stepper";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatActionList, MatListItem} from "@angular/material/list";
import {take} from "rxjs";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-select-exercise-dialog',
  templateUrl: './select-exercise-dialog.component.html',
  standalone: true,
  imports: [
    MatStepperModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatActionList,
    MatListItem,
    MatButton
  ]
})
export class SelectExerciseDialogComponent implements OnInit {

  exercises: Exercise[] = [];

  protected exerciseCategories: string[] = [];

  exercisesBySelectedCategory: Exercise[] = [];

  readonly IMAGE_BASE_URL = Urls.IMAGE_BASE_URL;

  constructor(private readonly exerciseService: ExerciseService,
              private readonly dialogRef: MatDialogRef<SelectExerciseDialogComponent>,
              protected readonly exerciseHelper: ExerciseHelperService) {
  }

  public ngOnInit(): void {
    this.exerciseService.getAllCategories()
      .subscribe(categories => {
        this.exerciseCategories = categories;
      })
  }

  protected setSelectedExercise(exercise: Exercise) {
    this.dialogRef.close(exercise);
  }

  protected selectCategory(category: string): void {
    this.exerciseService.getAllExercisesByCategory(category)
      .pipe(
        take(1)
      )
      .subscribe(exercises => {
        this.exercisesBySelectedCategory = exercises;
      });
  }
}
