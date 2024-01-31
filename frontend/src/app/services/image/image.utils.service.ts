import {Injectable} from "@angular/core";
import {Exercise} from "../../model/exercise/exercise";
import {PictureType} from "../../model/picture/pictureType";
import {Picture} from "../../model/picture/picture";

@Injectable({
  providedIn: 'root'
})
export class ImageUtilsService {

  getExerciseIconPath(exercise : Exercise) {
    const picture = this.getPictureByType(exercise, PictureType.EXERCISE_ICON);
    return picture ? picture.relativePath + '/' + picture.name : '';
  }

  getPictureByType(exercise: Exercise, pictureType : PictureType) : Picture | undefined {
    return exercise.pictures?.find(picture => picture.type === pictureType);
  }
}
