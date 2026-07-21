import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';
import {Exercise} from '../../../model/exercise/exercise';
import {Urls} from '../../../model/urls';
import {ExerciseHelperService} from '../../../services/exercise-helper/exercise-helper.service';

@Component({
  selector: 'exercise-image-dialog',
  imports: [MatDialogModule, MatIcon, MatIconButton, TranslateModule],
  templateUrl: './exercise-image-dialog.component.html',
})
export class ExerciseImageDialogComponent {

  protected readonly IMAGE_BASE_URL = Urls.IMAGE_BASE_URL;

  constructor(@Inject(MAT_DIALOG_DATA) protected readonly exercise: Exercise,
              protected readonly exerciseHelper: ExerciseHelperService) {
  }
}
