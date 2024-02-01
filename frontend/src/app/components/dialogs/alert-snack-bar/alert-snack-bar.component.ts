import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {CommonModule, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {AlertSnackBarModel} from "./model/alert-snack-bar.model";
import {CustomErrorResponse} from "../../../model/error/error.model";

@Component({
  selector: 'app-alert-snack-bar',
  templateUrl: './alert-snack-bar.component.html',
  styleUrls: ['./alert-snack-bar.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
  ]
})
export class AlertSnackBarComponent implements OnInit {

  messageTranslationKey: string | undefined;

  errorMessageTranslationKey: string | undefined;

  error : CustomErrorResponse | undefined;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: AlertSnackBarModel) {
    this.messageTranslationKey = data.message;
    this.error = data.error;
    this.errorMessageTranslationKey = data.errorMessage;
  }

  ngOnInit(): void {
  }

}
