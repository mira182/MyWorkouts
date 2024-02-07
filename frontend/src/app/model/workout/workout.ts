import {WorkoutExercise} from "../workout-exercise/workoutExercise";

export class Workout {
  id?: number;
  date: string;
  note: string;
  workoutExercises: WorkoutExercise[];
}
