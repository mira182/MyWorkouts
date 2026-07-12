import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ToolbarComponent} from "../../toolbar/toolbar.component";
import {BottomNavComponent} from "../bottom-nav/bottom-nav.component";
import {takeUntil} from "rxjs";
import {ThemeService} from "../../../services/theme/theme.service";
import {Unsubscribe} from "../../unsubscribe/unsubscribe";
import {OverlayContainer} from "@angular/cdk/overlay";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-home-layout',
    templateUrl: './home-page-layout.component.html',
    styles: [],
    imports: [
        RouterOutlet,
        ToolbarComponent,
        BottomNavComponent,
    ],
    providers: [
        ThemeService,
    ]
})
export class HomeLayoutComponent extends Unsubscribe implements OnInit {

  public isDarkTheme: boolean = false;

  constructor(protected readonly themeService: ThemeService,
              private readonly translateService: TranslateService,
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

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use('en');
  }
}
