import {Component, OnInit, signal} from '@angular/core';
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
    ]
})
export class HomeLayoutComponent extends Unsubscribe implements OnInit {

  public isDarkTheme = signal(false);

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
        this.isDarkTheme.set(isDarkTheme);
        this.overlayContainer.getContainerElement().classList.toggle('dark-theme', isDarkTheme);
      });

    this.translateService.use('en');
  }
}
