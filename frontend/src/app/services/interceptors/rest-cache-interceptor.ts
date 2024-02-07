import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {Urls} from "../../model/urls";
import {environment} from "../../../environments/environment";

const cache = new Map<String, HttpResponse<any>>();

const enpointsToCache = new Set([
  Urls.EXERCISE_URL + '/categories',
  Urls.EXERCISE_URL + '/types'
]);

export const restCacheInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  const url = req.url.replace(environment.apiUrl, '');

  if (enpointsToCache.has(url)) {

    const cachedResponse = cache.get(req.url);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next(req)
      .pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            cache.set(req.url, response);
          }
        })
      );
  }

  return next(req);
};
