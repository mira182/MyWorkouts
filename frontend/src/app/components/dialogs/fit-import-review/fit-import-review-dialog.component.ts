import {Component, Inject, OnInit, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {take} from 'rxjs';
import {FitExercise, FitSet, FitWorkout} from '../../../model/workout/fit-workout';
import {Exercise} from '../../../model/exercise/exercise';
import {WorkoutExercise} from '../../../model/workout-exercise/workoutExercise';
import {ExerciseService} from '../../../services/rest/exercise/exercise.service';
import {WorkoutService} from '../../../services/rest/workout/workout.service';
import {SnackBarService} from '../../../services/snack-bar/snack-bar.service';
import {AppDatePipe} from '../../../pipes/app-date.pipe';

interface ReviewBlock {
  garminName: string;
  sets: FitSet[];
  include: FormControl<boolean>;
  exerciseId: FormControl<number | null>;
}

@Component({
  selector: 'app-fit-import-review-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButton,
    MatIconButton,
    MatIcon,
    ReactiveFormsModule,
    TranslateModule,
    AppDatePipe,
  ],
  templateUrl: './fit-import-review-dialog.component.html',
})
export class FitImportReviewDialogComponent implements OnInit {

  protected readonly blocks: ReviewBlock[];

  protected exercises = signal<Exercise[]>([]);

  constructor(@Inject(MAT_DIALOG_DATA) protected readonly data: FitWorkout,
              private readonly dialogRef: MatDialogRef<FitImportReviewDialogComponent>,
              private readonly exerciseService: ExerciseService,
              private readonly workoutService: WorkoutService,
              private readonly snackBarService: SnackBarService) {
    this.blocks = (data.exercises ?? []).map((block: FitExercise) => ({
      garminName: block.garminName,
      sets: block.sets,
      include: new FormControl<boolean>(true, {nonNullable: true}),
      exerciseId: new FormControl<number | null>(block.suggestedExerciseId ?? null),
    }));
  }

  public ngOnInit(): void {
    this.exerciseService.getAllExercises()
      .pipe(take(1))
      .subscribe({
        next: exercises => this.exercises.set(exercises),
        error: err => this.snackBarService.showErrorSnackBar(err),
      });
  }

  protected formatSets(sets: FitSet[]): string {
    return sets.map(set => {
      if (set.weight > 0) {
        return `${set.weight}×${set.reps}`;
      }
      return set.reps > 0 ? `${set.reps} reps` : `${set.duration}s`;
    }).join(' · ');
  }

  /** Every included block must have an exercise chosen, and at least one is included. */
  protected canSave(): boolean {
    const included = this.blocks.filter(block => block.include.value);
    return included.length > 0 && included.every(block => block.exerciseId.value != null);
  }

  protected save(): void {
    this.persistMappings();

    const workoutExercises: WorkoutExercise[] = this.blocks
      .filter(block => block.include.value)
      .map(block => ({
        exercise: this.exercises().find(exercise => exercise.id === block.exerciseId.value),
        workoutSets: block.sets.map(set => ({
          weight: set.weight,
          reps: set.reps,
          duration: set.duration,
          distance: 0,
        })),
      }));

    this.dialogRef.close({date: this.data.date, workoutExercises});
  }

  private persistMappings(): void {
    const mappings = this.blocks
      .filter(block => block.include.value && block.exerciseId.value != null && !block.garminName.startsWith('UNKNOWN'))
      .map(block => ({garminName: block.garminName, exerciseId: block.exerciseId.value!}));

    if (mappings.length) {
      this.workoutService.saveFitMappings(mappings).pipe(take(1)).subscribe({error: () => {}});
    }
  }
}
