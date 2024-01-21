import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {createTranslateLoader} from "./app.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule, provideNoopAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    })),
    importProvidersFrom(BrowserAnimationsModule),
    provideNoopAnimations()
]
};
