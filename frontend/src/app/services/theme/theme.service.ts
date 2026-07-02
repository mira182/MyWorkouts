import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private static readonly STORAGE_KEY = 'darkTheme';

  private darkTheme = new BehaviorSubject(ThemeService.initialValue());

  constructor() { }

  private static initialValue(): boolean {
    const stored = localStorage.getItem(ThemeService.STORAGE_KEY);
    return stored !== null ? stored === 'true' : true;
  }

  public setDarkTheme(isDarkTheme: boolean): void {
    localStorage.setItem(ThemeService.STORAGE_KEY, String(isDarkTheme));
    this.darkTheme.next(isDarkTheme);
  }

  public get isDarkTheme(): Observable<boolean> {
    return this.darkTheme.asObservable();
  }

  public get isDarkThemeValue(): boolean {
    return this.darkTheme.value;
  }
}
