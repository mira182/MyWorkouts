import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ThemeService} from "./services/theme/theme.service";
import {NgxSpinnerModule} from "ngx-spinner";
import {LoginService} from "./services/rest/auth/login.service";
import {TranslateModule} from "@ngx-translate/core";
import {OverlayContainer} from "@angular/cdk/overlay";
import {MatToolbar} from "@angular/material/toolbar";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatMenu, MatMenuModule} from "@angular/material/menu";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatDrawer, MatDrawerContainer, MatSidenavContainer} from "@angular/material/sidenav";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CommonModule} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {takeUntil} from "rxjs";
import {Unsubscribe} from "./components/unsubscribe/unsubscribe";
import {TokenService} from "./services/rest/auth/token.service";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    MatIcon,
    MatToolbar,
    TranslateModule,
    MatSlideToggle,
    MatMenu,
    MatIconButton,
    MatButton,
    RouterLinkActive,
    RouterLink,
    MatListItem,
    MatSidenavContainer,
    MatNavList,
    NgxSpinnerModule,
    MatDrawerContainer,
    MatDrawer,
    MatMenuModule,
    MatTooltip,
  ],
  providers: [LoginService, ThemeService, TokenService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent extends Unsubscribe {
  static weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  public isDarkTheme: boolean = false;

  constructor(private readonly sanitizer: DomSanitizer,
              private readonly iconRegistry: MatIconRegistry,
              private readonly themeService: ThemeService,
              private readonly overlayContainer: OverlayContainer) {
    super();

    iconRegistry.addSvgIcon('bathroom-scale',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/bathroom-scale.svg'));
    iconRegistry.addSvgIcon('home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/house.svg'));
    iconRegistry.addSvgIcon('cz',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cz-flag.svg'));
    iconRegistry.addSvgIcon('en',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/us-flag.svg'));
    iconRegistry.addSvgIcon('logout',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'));
    iconRegistry.addSvgIcon('workout',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/workout.svg'));
    iconRegistry.addSvgIcon('training',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/training.svg'));
    iconRegistry.addSvgIcon('dashboard',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard.svg'));
    iconRegistry.addSvgIcon('exercises',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/yoga.svg'));

    this.themeService.isDarkTheme
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe(isDarkTheme => {
        if (isDarkTheme) {
          this.overlayContainer.getContainerElement().classList.add('dark-theme');
        }
      });
  }
}
