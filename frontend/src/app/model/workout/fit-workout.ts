/** Draft workout parsed from a Garmin FIT file (backend /workout/importFit). */
export interface FitWorkout {
  date: string;
  exercises: FitExercise[];
}

export interface FitExercise {
  garminName: string;
  suggestedExerciseId?: number;
  sets: FitSet[];
}

export interface FitSet {
  reps: number;
  weight: number;
  duration: number;
}
