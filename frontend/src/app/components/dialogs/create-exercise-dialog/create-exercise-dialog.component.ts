import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ImagePreviewComponent} from "../../image-preview/image-preview.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {PageHeaderLayoutComponent} from "../../layouts/page-header-layout/page-header-layout.component";
import {combineLatest, take} from "rxjs";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {ExerciseService} from "../../../services/rest/exercise/exercise.service";

@Component({
    selector: 'app-create-exercise-dialog',
    templateUrl: './create-exercise-dialog.component.html',
    imports: [
    TranslateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    ImagePreviewComponent,
    MatIconButton,
    MatButton,
    MatInput,
    MatIcon,
    PageHeaderLayoutComponent
]
})
export class CreateExerciseDialogComponent implements OnInit {

  protected form: FormGroup;

  protected exerciseTypes = signal<string[]>([]);

  protected exerciseCategories = signal<string[]>([]);

  protected selectedImage: File;

  constructor(protected readonly dialogRef: MatDialogRef<CreateExerciseDialogComponent>,
              private readonly formBuilder: FormBuilder,
              private readonly snackBarService: SnackBarService,
              private readonly exerciseService: ExerciseService) {
    combineLatest([
      this.exerciseService.getAllCategories(),
      this.exerciseService.getAllTypes()
    ])
      .pipe(
        take(1),
      )
      .subscribe({
        next: ([categories, types]) => {
          this.exerciseCategories.set(categories);
          this.exerciseTypes.set(types);
        },
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  protected close() {
    this.dialogRef.close({
      exercise: this.form.value,
      imageFile: this.selectedImage,
    });
  }

}
