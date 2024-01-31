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
import {ExerciseCategory} from "../../../model/exercise/exerciseCategory";
import {MatButton} from "@angular/material/button";
import {ExerciseType} from "../../../model/exercise/exerciseType";
import {EditExerciseDialogInputModel} from "./model/edit-exercise-dialog-input.model";

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

  protected exerciseCategories: ExerciseCategory[] = [];

  protected exerciseTypes: ExerciseType[] = [];

  protected exercise: Exercise;

  protected selectedImage: File;

  protected editExerciseForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: EditExerciseDialogInputModel,
              public dialogRef: MatDialogRef<EditExerciseDialogComponent>) {
  }

  public ngOnInit(): void {
    this.exerciseCategories = this.data.exerciseCategories;
    this.exercise = this.data.exercise;
    this.exerciseTypes = this.data.exerciseTypes;
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
