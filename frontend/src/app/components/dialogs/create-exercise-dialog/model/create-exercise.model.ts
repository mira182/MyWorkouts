import {Exercise} from "../../../../model/exercise/exercise";

export interface CreateExerciseModel {
  exercise: Exercise;
  imageFile: File;
}
