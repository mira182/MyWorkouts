import {Moment} from "moment";
import {TrainingPlan} from "../training/trainingPlan";
import {WorkoutExercise} from "../exercise/workoutExercise";

export class Workout {
  id?: number;
  date: Moment;
  note: string;
  exercises: WorkoutExercise[];
}
