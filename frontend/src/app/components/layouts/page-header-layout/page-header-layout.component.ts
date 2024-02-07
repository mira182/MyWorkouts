import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-page-header-layout',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    MatTooltip,
    TranslateModule
  ],
  templateUrl: './page-header-layout.component.html',
  styleUrls: ['./page-header-layout.component.scss']
})
export class PageHeaderLayoutComponent {

}
