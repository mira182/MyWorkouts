import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [
    NgIf,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './expansion-panel.component.html',
  animations : [
    trigger('animationShowHide', [
      state('close', style({ height: '0px', overflow: 'hidden' })),
      state('open', style({ height: '*',overflow: 'hidden'})),
      transition('open <=> close', animate('900ms ease-in-out')),
    ]),
    trigger('animationRotate', [
      state('close', style({ transform: 'rotate(0)' })),
      state('open', style({ transform: 'rotate(-180deg)' })),
      transition('open <=> close', animate('300ms ease-in-out')),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ]),
  ],
})
export class ExpansionPanelComponent {

  protected sStatus = 'close';

  protected toggleContent: boolean;

  protected onSwitch(){
    this.toggleContent = !this.toggleContent;
    this.sStatus = this.sStatus === 'close' ? 'open' : 'close';
  }
}
