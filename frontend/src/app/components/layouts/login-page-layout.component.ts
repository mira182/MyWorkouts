import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-login-layout',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class LoginLayoutComponent {}
