import {Exercise} from "../exercise/exercise";
import {WorkoutSet} from "../exercise/workoutSet";

export class WorkoutExercise {

  id?: number;

  exercise: Exercise;

  date?: string;

  workoutSets: WorkoutSet[];

}
