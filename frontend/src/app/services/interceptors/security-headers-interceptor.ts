import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export const securityHeadersInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const cloned = req.clone({
    headers: req.headers.set('Cache-Control', 'no-cache,no-store,max-age=0,must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', '-1')
      .set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
      .set('X-XSS-Protection', '1;mode=block')
      .set('X-Frame-Options', 'SAMEORIGIN')
      .set('Content-Security-Policy', "script-src 'self'")
      .set('X-Content-Type-Options', 'nosniff')
  });
  return next(cloned);
};
