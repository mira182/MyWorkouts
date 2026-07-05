import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-login-layout',
    template: `
    <router-outlet></router-outlet>
  `,
    styles: [],
    imports: [
        RouterOutlet
    ]
})
export class LoginLayoutComponent {}
