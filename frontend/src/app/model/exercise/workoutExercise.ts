import {Exercise} from "./exercise";
import {WorkoutSet} from "./workoutSet";
import {Moment} from "moment";

export class WorkoutExercise {

  exercise: Exercise;

  dateTime?: Moment;

  workoutSets: WorkoutSet[];

}
