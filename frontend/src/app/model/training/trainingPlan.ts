import {TrainingExercise} from "./trainingExercise";

export class TrainingPlan {

  id: number;

  name: string;

  trainingExercises: TrainingExercise[];

  trainingDay: string;

  trainingTime: string;

  scheduled: boolean;

  startDate: string;
}
