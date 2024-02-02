import {WorkoutExercise} from "../exercise/workoutExercise";

export class Workout {
  id?: number;
  date: string;
  note: string;
  exercises: WorkoutExercise[];
}
