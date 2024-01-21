import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {CommonModule, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

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

  message : string;

  errorMessage : string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message;
    this.errorMessage = data.errorMessage;
  }

  ngOnInit(): void {
  }

}
