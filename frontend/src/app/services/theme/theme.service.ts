import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkTheme = new BehaviorSubject(false);

  constructor() { }

  public setDarkTheme(isDarkTheme: boolean): void {
    this.darkTheme.next(isDarkTheme);
  }

  public get isDarkTheme(): Observable<boolean> {
    return this.darkTheme.asObservable();
  }
}
