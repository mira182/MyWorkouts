import {Injectable} from '@angular/core';
import {Exercise} from "../../model/exercise/exercise";
import {PictureType} from "../../model/picture/pictureType";
import {Picture} from "../../model/picture/picture";
import {ImageService} from "../rest/image/image.service";

@Injectable({
  providedIn: 'root'
})
export class ExerciseHelperService {

  constructor(private imageService : ImageService) { }

  getExerciseImagePath(exercise : Exercise) {
    const picture = this.getPictureByType(exercise, PictureType.EXERCISE_IMAGE);
    return picture ? picture.relativePath + '/' + picture.name : "";
  }

  public getExerciseIconPath(exercise : Exercise) {
    const picture = this.getPictureByType(exercise, PictureType.EXERCISE_ICON);
    return picture ? picture.relativePath + '/' + picture.name : "";
  }

  getPictureByType(exercise: Exercise, pictureType : PictureType) : Picture {
    return exercise.pictures?.find(picture => picture.type === pictureType);
  }

  getExercisePicture(picture : Picture, exercise : Exercise, outputArray) {
    if (picture) {
      if (!outputArray[exercise.id]) {
        this.imageService.getImage(picture.id).subscribe(image => {
          // let objectURL = URL.createObjectURL(image);
          // this.imagesUrls[exercise.id] = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          // this.imagesUrls[exercise.id] = image;

          if (image && image.size > 0) {
            let reader = new FileReader();

            reader.addEventListener("load", () => {
              outputArray[exercise.id] = reader.result;
            }, false);

            reader.readAsDataURL(image);
          }
        });
      }
    }
  }
}
