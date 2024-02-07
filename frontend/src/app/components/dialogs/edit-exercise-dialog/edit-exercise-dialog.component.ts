import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Exercise} from "../../../model/exercise/exercise";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatInput} from "@angular/material/input";
import {ImagePreviewComponent} from "../../image-preview/image-preview.component";
import {MatButton} from "@angular/material/button";
import {EditExerciseDialogInputModel} from "./model/edit-exercise-dialog-input.model";
import {combineLatest, take} from "rxjs";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {ExerciseService} from "../../../services/rest/exercise/exercise.service";

@Component({
  selector: 'app-edit-exercise-dialog',
  templateUrl: './edit-exercise-dialog.component.html',
  styleUrls: ['./edit-exercise-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatInput,
    ImagePreviewComponent,
    MatButton,
    MatLabel,
    MatError,
  ]
})
export class EditExerciseDialogComponent implements OnInit {

  protected exerciseCategories: string[] = [];

  protected exerciseTypes: string[] = [];

  protected exercise: Exercise;

  protected selectedImage: File;

  protected editExerciseForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private readonly data: EditExerciseDialogInputModel,
              protected readonly dialogRef: MatDialogRef<EditExerciseDialogComponent>,
              private readonly exerciseService: ExerciseService,
              private readonly snackBarService: SnackBarService) {
    this.exercise = data.exercise;
  }

  public ngOnInit(): void {
    this.exercise = this.data.exercise;

    combineLatest([
      this.exerciseService.getAllCategories(),
      this.exerciseService.getAllTypes()
    ])
      .pipe(
        take(1),
      )
      .subscribe({
        next: ([categories, types]) => {
          this.exerciseCategories = categories;
          this.exerciseTypes = types;
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });

    this.editExerciseForm = this.formBuilder.group({
      id: new FormControl(this.exercise.id),
      name: new FormControl(this.exercise.name, Validators.required),
      category: new FormControl(this.exercise.category, Validators.required),
      type: new FormControl(this.exercise.type, Validators.required),
    });
  }

  protected saveEditedExercise() {
    this.dialogRef.close({
      exercise: this.editExerciseForm.value,
      imageFile: this.selectedImage
    });
  }

  protected onSelectedImage(file: File) {
    this.selectedImage = file;
  }
}
