import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SwUpdate, VersionReadyEvent} from '@angular/service-worker';
import {TranslateService} from '@ngx-translate/core';
import {filter} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppUpdateService {

  constructor(private readonly swUpdate: SwUpdate,
              private readonly snackBar: MatSnackBar,
              private readonly translate: TranslateService) {
  }

  public init(): void {
    // Disabled in dev builds (provideServiceWorker is prod-only).
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates
      .pipe(filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'))
      .subscribe(() => this.promptReload());

    // Resuming the PWA from the background doesn't restart the app, so ask the
    // service worker to look for a new version whenever it becomes visible again.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.swUpdate.checkForUpdate().catch(() => {}); // offline: try again next time
      }
    });
  }

  private promptReload(): void {
    // Deliberately a prompt, not an automatic reload — a reload mid-entry would
    // throw away whatever is being typed into a workout.
    this.snackBar
      .open(this.translate.instant('ALERT.update-available'), this.translate.instant('BUTTON.reload'), {
        verticalPosition: 'bottom',
      })
      .onAction()
      .subscribe(() => document.location.reload());
  }
}
