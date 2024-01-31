import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {createTranslateLoader} from "./app.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {provideMomentDateAdapter} from "@angular/material-moment-adapter";
import {jwtInterceptor} from "./services/interceptors/jwt-interceptor";
import {errorInterceptor} from "./services/interceptors/error-interceptor";
import {NgxSpinnerModule} from "ngx-spinner";

export const API_DATE_FORMAT = 'yyyy-MM-DD';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
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
    importProvidersFrom(BrowserAnimationsModule),
    // provideNoopAnimations(),
    importProvidersFrom(NgxSpinnerModule.forRoot()),
    provideAnimations(),
  ]
};
