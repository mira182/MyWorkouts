import {Exercise} from "../exercise/exercise";
import {TrainingSet} from "./trainingSet";

export class TrainingExercise {
  id?: number;
  exercise: Exercise;
  trainingSets: TrainingSet[];
  position?: number;
}
