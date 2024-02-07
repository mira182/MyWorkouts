import {Workout} from "../workout/workout";

export class TrainingPlan {

  id: number;

  name: string;

  workout: Workout;

  trainingDay: string;

  trainingTime: string;

  scheduled: boolean;

  startDate: string;
}
