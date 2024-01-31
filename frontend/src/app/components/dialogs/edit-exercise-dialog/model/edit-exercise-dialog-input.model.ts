import {ExerciseCategory} from "../../../../model/exercise/exerciseCategory";
import {Exercise} from "../../../../model/exercise/exercise";
import {ExerciseType} from "../../../../model/exercise/exerciseType";

export interface EditExerciseDialogInputModel {
  exerciseCategories: ExerciseCategory[];
  exercise: Exercise;
  exerciseTypes: ExerciseType[];
}
