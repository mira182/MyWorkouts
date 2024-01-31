import {WorkoutExercise} from "../exercise/workoutExercise";

export class TrainingPlan {

  id: number;

  name: string;

  workouts: WorkoutExercise[];

  trainingDay: string;

  trainingTime: string;

  scheduled: boolean;

  startDate: string;
}
