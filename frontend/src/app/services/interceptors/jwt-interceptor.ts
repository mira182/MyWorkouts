import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {Observable} from "rxjs/index";
import {TokenService} from "../rest/auth/token.service";
import {isNil} from "lodash";

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  if (!isNil(token)) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(modifiedReq)
  } else {
    return next(req);
  }
};
