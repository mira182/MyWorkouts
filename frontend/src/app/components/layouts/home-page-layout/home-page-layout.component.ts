import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ToolbarComponent} from "../../toolbar/toolbar.component";
import {take, takeUntil} from "rxjs";
import {ThemeService} from "../../../services/theme/theme.service";
import {Unsubscribe} from "../../unsubscribe/unsubscribe";
import {OverlayContainer} from "@angular/cdk/overlay";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavModule
} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatTooltip} from "@angular/material/tooltip";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ImportService} from "../../../services/rest/export-import/import.service";
import {LoginService} from "../../../services/rest/auth/login.service";
import {SnackBarService} from "../../../services/snack-bar/snack-bar.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-page-layout.component.html',
  styles: [],
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent,
    MatDrawer,
    MatDrawerContainer,
    MatIcon,
    MatIconButton,
    MatListItem,
    MatMenu,
    MatMenuItem,
    MatNavList,
    MatSlideToggle,
    MatTooltip,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    MatMenuModule,
    MatSidenavContainer,
    MatSidenav,
    MatCheckbox,
    MatButton,
    FormsModule,
    MatSidenavModule
  ],
  providers: [
    ThemeService,
  ]
})
export class HomeLayoutComponent extends Unsubscribe implements OnInit {

  public isDarkTheme: boolean = false;

  opened: boolean;

  constructor(protected readonly themeService: ThemeService,
              private readonly loginService : LoginService,
              private readonly snackBar: SnackBarService,
              private readonly exportImportService: ImportService,
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

  protected logOut() {
    this.loginService.logout();
  }

  protected import() {
    this.exportImportService.importLatest()
      .pipe(take(1))
      .subscribe({
        next: () => this.snackBar.showSuccessSnackBar('ALERT.success'),
        error: err => () => this.snackBar.showSuccessSnackBar(err),
      });
  }

  protected selectionChanged(selectedLanguage: string): void {
    this.translateService.use(selectedLanguage);
  }

}
