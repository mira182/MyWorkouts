import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ThemeService {

  private isDarkTheme = new BehaviorSubject(false);
  sharedTheme = this.isDarkTheme.asObservable();

  constructor() { }

  setDarkTheme(isDarkTheme: boolean) {
    this.isDarkTheme.next(isDarkTheme);
  }
}
