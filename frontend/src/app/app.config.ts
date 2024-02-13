import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {createTranslateLoader} from "./app.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {provideMomentDateAdapter} from "@angular/material-moment-adapter";
import {jwtInterceptor} from "./services/interceptors/jwt-interceptor";
import {errorInterceptor} from "./services/interceptors/error-interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {restCacheInterceptor} from "./services/interceptors/rest-cache-interceptor";
import {MyDateAdapter} from "./config/date-picker-adapter";
import {CookieModule} from "ngx-cookie";

export const API_DATE_FORMAT = 'yyyy-MM-DD';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor, restCacheInterceptor])),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'en',
    })),
    provideMomentDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: MyDateAdapter, deps: [MAT_DATE_LOCALE] },
    importProvidersFrom(BrowserAnimationsModule),
    // provideNoopAnimations(),
    importProvidersFrom(NgxSpinnerModule.forRoot()),
    provideAnimations(),
    importProvidersFrom(CookieModule.withOptions())
  ]
};
