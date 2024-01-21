import {WorkoutExercise} from "../exercise/workoutExercise";

export class Training {
  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.workouts = json.workouts;
    this.trainingDay = json.trainingDay;
    this.scheduled = json.scheduled;
    this.trainingTime = json.trainingTime;
    this.startDate = json.startDate;
  }

  id: number;

  name: string;

  workouts: WorkoutExercise[];

  trainingDay: string;

  trainingTime: string;

  scheduled: boolean;

  startDate: string;
}
