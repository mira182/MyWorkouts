import {ExerciseCategory} from "../../../../model/exercise/exerciseCategory";
import {Exercise} from "../../../../model/exercise/exercise";

export interface EditExerciseDialogInputModel {
  exerciseCategories: ExerciseCategory[];
  exercise: Exercise;
}
