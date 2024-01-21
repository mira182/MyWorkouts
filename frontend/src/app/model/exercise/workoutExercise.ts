import {Exercise} from "./exercise";
import {WorkoutSet} from "./workoutSet";

export class WorkoutExercise {

  constructor(json: any) {
    this.id = json.id;
    this.exercise = json.exercise;
    this.dateTime = json.dateTime;
    this.workoutSets = json.workoutSets;
  }

  id: number;

  exercise: Exercise;

  dateTime: Date;

  workoutSets: WorkoutSet[];

  public getVolume() {
    return this.workoutSets.reduce(((previousValue, currentValue) =>
        previousValue + currentValue.reps * currentValue.weight), 0);
  }

  public getReps() {
    return this.workoutSets.reduce(
      (previousValue, currentValue) => previousValue + currentValue.reps, 0)
  }

  public getSets() {
    return this.workoutSets.length;
  }

}

Date.prototype.toJSON = function() {
  return this.datepipe.transform(this.dateTime, "yyyy-MM-dd");
};
