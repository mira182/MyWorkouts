import {inject} from '@angular/core';
import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {LoginService} from "../rest/auth/login.service";
import {SnackBarService} from "../snack-bar/snack-bar.service";
import {CustomErrorResponse} from "../../model/error/error.model";

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const snackBarService = inject(SnackBarService);
  const authService = inject(LoginService);
  const router = inject(Router);
  return next(req).pipe(
    catchError(err => {
      const error: CustomErrorResponse = err.error;
      if (err.status !== 200) {
        if (err.status === 401 || err.status === 403) {
          // auto logout if 401 response returned from api
          authService.logout();
          if (!router.url.includes("login"))
            location.reload();
        // } else if (err.status === 400) {
        //   router.navigate(['/400']);
        //   errorMessageService.storeError(err);
        } else if (err.status === 404) {
          snackBarService.showErrorSnackBar(error);
        // } else if (err.status === 500) {
        //   router.navigate(['/500']);
        //   errorMessageService.storeError(err);
        } else if (err.status === 0) {
          snackBarService.showErrorSnackBar(error);
        }
        throw new Error(`Error ${ err.message }`)
      } else {
        return next(req);
      }
    })
  )
};
