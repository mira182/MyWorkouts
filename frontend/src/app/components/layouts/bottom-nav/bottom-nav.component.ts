import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'bottom-nav',
  imports: [RouterLink, RouterLinkActive, MatIcon, TranslateModule],
  styleUrl: './bottom-nav.component.scss',
  template: `
    <nav class="flex justify-around items-stretch h-16">
      <a routerLink="/home" routerLinkActive="nav-active" class="nav-item">
        <mat-icon>home</mat-icon>
        <span class="text-[11px] leading-none">{{ 'HOME.home' | translate }}</span>
      </a>
      <a routerLink="/workouts" routerLinkActive="nav-active" class="nav-item">
        <mat-icon>fitness_center</mat-icon>
        <span class="text-[11px] leading-none">{{ 'WORKOUTS.workouts' | translate }}</span>
      </a>
      <a routerLink="/weight" routerLinkActive="nav-active" class="nav-item">
        <mat-icon>monitor_weight</mat-icon>
        <span class="text-[11px] leading-none">{{ 'WEIGHT.weight' | translate }}</span>
      </a>
      <a routerLink="/exercises" routerLinkActive="nav-active" class="nav-item">
        <mat-icon>menu_book</mat-icon>
        <span class="text-[11px] leading-none">{{ 'TITLES.exercises' | translate }}</span>
      </a>
      <a routerLink="/trainings" routerLinkActive="nav-active" class="nav-item">
        <mat-icon>event_note</mat-icon>
        <span class="text-[11px] leading-none">{{ 'BUTTON.trainings' | translate }}</span>
      </a>
      <a routerLink="/dashboard" routerLinkActive="nav-active" class="nav-item">
        <mat-icon>insights</mat-icon>
        <span class="text-[11px] leading-none">{{ 'BUTTON.dashboard' | translate }}</span>
      </a>
    </nav>
  `,
})
export class BottomNavComponent {
}
