import {inject} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {LoginService} from "../rest/auth/login.service";
import {normalizeHttpError} from "../../model/error/error.model";

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(LoginService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 403) {
        authService.logout();
        if (!router.url.includes("login")) {
          location.reload();
        }
      }
      const normalized = normalizeHttpError(err);
      return throwError(() => new HttpErrorResponse({
        error: normalized,
        status: err.status,
        statusText: err.statusText,
        url: err.url ?? undefined,
        headers: err.headers,
      }));
    })
  );
};
