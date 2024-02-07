import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {isNil} from "lodash";

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatIconButton
  ]
})
export class ImagePreviewComponent {

  @Output()
  public selectedImage = new EventEmitter<File>();

  protected imgURL: any;

  protected message: string;

  constructor() { }

  protected preview(files: FileList | undefined | null) {
    if (isNil(files) ||  files?.length === 0) {
      this.message = "Only images are supported.";
      return;
    }

    let reader = new FileReader();
    this.selectedImage.emit(files[0])
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

}
