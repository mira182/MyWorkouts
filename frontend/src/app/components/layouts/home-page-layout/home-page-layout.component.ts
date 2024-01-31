import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ToolbarComponent} from "../../toolbar/toolbar.component";
import {takeUntil} from "rxjs";
import {ThemeService} from "../../../services/theme/theme.service";
import {Unsubscribe} from "../../unsubscribe/unsubscribe";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-page-layout.component.html',
  styles: [],
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent
  ],
  providers: [
    ThemeService,
  ]
})
export class HomeLayoutComponent extends Unsubscribe implements OnInit {

  public isDarkTheme: boolean = false;

  constructor(private readonly themeService: ThemeService,
              private readonly overlayContainer: OverlayContainer) {
    super();
  }

  ngOnInit(): void {
    // switch themes
    this.themeService.isDarkTheme
      .pipe(
        takeUntil(this.unSubscribe),
      )
      .subscribe(isDarkTheme => {
        this.isDarkTheme = isDarkTheme;
        if (this.isDarkTheme) {
          this.overlayContainer.getContainerElement().classList.add('dark-theme');
        }
      });
  }



}
