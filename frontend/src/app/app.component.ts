import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {User} from "./model/user/user";
import {MatIcon, MatIconRegistry} from "@angular/material/icon";
import {BrowserModule, DomSanitizer} from "@angular/platform-browser";
import {ThemeService} from "./services/theme/theme.service";
import {MatDialog} from "@angular/material/dialog";
import {SnackBarService} from "./services/snack-bar/snack-bar.service";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "./services/rest/auth/auth.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {OverlayContainer} from "@angular/cdk/overlay";
import {ExportImportService} from "./services/rest/export-import/export-import.service";
import {UserService} from "./services/rest/user/user.service";
import {SelectImportComponent} from "./components/dialogs/select-import/select-import.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatDrawer, MatDrawerContainer, MatSidenavContainer} from "@angular/material/sidenav";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {take, takeUntil} from "rxjs";
import {Unsubscribe} from "./components/unsubscribe/unsubscribe";

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
  providers: [AuthService, ThemeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent extends Unsubscribe {
  selectedComponentName: string = "";

  user : User = new User();

  isDarkTheme: boolean;

  static weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  constructor(private authService : AuthService,
              private translate: TranslateService,
              private readonly iconRegistry: MatIconRegistry,
              private readonly sanitizer: DomSanitizer,
              protected readonly themeService: ThemeService,
              private exportImportService: ExportImportService,
              private snackBar: SnackBarService,
              private dialog: MatDialog,
              private spinner: NgxSpinnerService,
              private overlayContainer: OverlayContainer) {
    super();

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

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

    this.user = UserService.getCurrentUser();

    // switch themes
    this.themeService.sharedTheme
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

  protected showNavBar() {
    return !!UserService.getCurrentUser();
  }

  protected logOut() {
    this.authService.logout();
  }

  protected selectionChanged(selectedLanguage: string): void {
    this.translate.use(selectedLanguage);
  }

  protected export() {
    this.spinner.show();
    this.exportImportService.export()
      .pipe(
        take(1),
        takeUntil(this.unSubscribe),
      )
      .subscribe(result => {
      if (result) {
        this.spinner.hide();
        this.snackBar.showSuccessSnackBar("Successfully exported.");
      }
    }, error => {
      this.spinner.hide();
      this.snackBar.showErrorSnackBar("Failed to export: " + error.message);
    });
  }

  protected import() {
    const dialogRef = this.dialog.open(SelectImportComponent, {
      height: 'auto',
      width: '400px',
      hasBackdrop: true
    });

    dialogRef.afterClosed()
      .pipe(
        take(1),
        takeUntil(this.unSubscribe),
      )
      .subscribe(folderName => {
      if (folderName) {
        this.spinner.show();
        this.exportImportService.importFromFolder(folderName).subscribe(result => {
          if (result) {
            this.spinner.hide();
            this.snackBar.showSuccessSnackBar("Successfully imported.");
          }
        }, error => {
          this.spinner.hide();
          this.snackBar.showErrorSnackBar("Failed to import: " + error.message);
        });
      }
    });
  }
}
