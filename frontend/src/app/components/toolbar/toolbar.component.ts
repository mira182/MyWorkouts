import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {UserService} from "../../services/rest/user/user.service";
import {take} from "rxjs";
import {LoginService} from "../../services/rest/auth/login.service";
import {ThemeService} from "../../services/theme/theme.service";
import {ImportService} from "../../services/rest/export-import/import.service";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../model/user/user";
import {Unsubscribe} from "../unsubscribe/unsubscribe";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenuModule,
    MatSlideToggle,
    MatToolbar,
    MatTooltip,
    NgIf,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    MatDrawer,
    MatDrawerContainer,
    MatListItem,
    MatNavList,
    NgxSpinnerModule,
    RouterOutlet,
  ],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent extends Unsubscribe implements OnInit {

  private user : User = new User();

  public isDarkTheme: boolean = false;

  constructor(private readonly translateService: TranslateService,
              private loginService : LoginService,
              protected readonly themeService: ThemeService,
              private exportImportService: ImportService,
              private snackBar: SnackBarService,
              private dialog: MatDialog,
              private spinner: NgxSpinnerService) {
    super();
  }

  ngOnInit(): void {

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use('en');

    this.user = UserService.getCurrentUser();
  }

  protected selectionChanged(selectedLanguage: string): void {
    this.translateService.use(selectedLanguage);
  }

  protected showNavBar() {
    return !!UserService.getCurrentUser();
  }

  protected logOut() {
    this.loginService.logout();
  }

  protected import() {
    this.exportImportService.importLatest()
      .pipe(take(1))
      .subscribe(() => this.snackBar.showSuccessSnackBar('ALERT.success'));
  }
}
