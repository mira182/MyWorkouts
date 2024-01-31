import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../services/rest/auth/login.service";
import {ErrorMessageService} from "../../services/error/error-message.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {isNil} from "lodash";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {finalize, take} from "rxjs";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {SnackBarService} from "../../services/snack-bar/snack-bar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIcon,
    MatError,
    TranslateModule,
    FormsModule,
    MatInput,
    CommonModule,
    MatCardContent,
    MatButton,
    NgxSpinnerModule,
    MatIconButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit {


  public form: FormGroup;
  public hidePassword = true;
  submitted = false;
  returnUrl: string;
  loggingIn : boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly errorService : ErrorMessageService,
    private readonly translate : TranslateService,
    private readonly formBuilder: FormBuilder,
    private readonly spinner: NgxSpinnerService,
    private readonly snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.loginService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public isFieldInvalid(field: string) {
    return (
      (!this.form.get(field)?.valid && this.form.get(field)?.touched) || this.form.get(field)?.untouched
    );
  }

  public onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.spinner.show();
    this.loginService.login(this.form.value)
      .pipe(
        take(1),
        finalize(() => this.spinner.hide()),
      )
      .subscribe({
        next: () => this.router.navigateByUrl(this.returnUrl),
        error: (error) => this.snackBarService.showErrorSnackBar(error?.error)
      });
  }
}
