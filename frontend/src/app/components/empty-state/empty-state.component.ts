import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  imports: [MatIcon],
  template: `
    <div class="flex flex-col items-center gap-3 py-10 text-center">
      <div class="w-16 h-16 rounded-2xl grid place-items-center bg-[var(--brand-primary-softer)]">
        <mat-icon class="!w-8 !h-8 !text-[32px] text-[var(--brand-primary)] opacity-70">{{ icon }}</mat-icon>
      </div>
      <p class="m-0 opacity-70">{{ message }}</p>
      <ng-content></ng-content>
    </div>
  `,
})
export class EmptyStateComponent {

  @Input() icon = 'inbox';

  @Input() message = '';
}
