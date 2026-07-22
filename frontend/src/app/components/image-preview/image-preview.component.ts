import {Component, EventEmitter, Output, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";

import {MatIconButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {TranslateModule} from "@ngx-translate/core";
import {isNil} from "lodash";

@Component({
    selector: 'app-image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.scss'],
    imports: [
    MatIcon,
    MatIconButton,
    MatProgressSpinner,
    TranslateModule
]
})
export class ImagePreviewComponent {

  @Output()
  public selectedImage = new EventEmitter<File>();

  // Signals, not plain fields: these are written from FileReader callbacks, which
  // don't trigger change detection on their own in a zoneless app.
  protected imgURL = signal<string | null>(null);

  protected loading = signal(false);

  protected message = signal<string | null>(null);

  constructor() { }

  protected preview(files: FileList | undefined | null) {
    if (isNil(files) || files?.length === 0) {
      this.message.set('ALERT.only-images-supported');
      return;
    }

    this.message.set(null);
    this.imgURL.set(null);
    // Reading a photo off the device isn't instant — show a spinner until it's decoded.
    this.loading.set(true);

    const reader = new FileReader();
    reader.onload = () => {
      this.imgURL.set(reader.result as string);
      this.loading.set(false);
    };
    reader.onerror = () => {
      this.message.set('ALERT.image-read-failed');
      this.loading.set(false);
    };

    this.selectedImage.emit(files[0]);
    reader.readAsDataURL(files[0]);
  }

}
