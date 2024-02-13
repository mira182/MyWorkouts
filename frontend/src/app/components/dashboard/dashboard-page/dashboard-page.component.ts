import {Component} from '@angular/core';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconButton} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {DashboardBreakdownComponent} from "../dashboard-breakdown/dashboard-breakdown.component";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {DashboardTotalsComponent} from "../dashboard-totals/dashboard-totals.component";
import {DashboardWorkoutsComponent} from "../dashboard-workouts/dashboard-workouts.component";
import {DashboardExercisesComponent} from "../dashboard-exercises/dashboard-exercises.component";

@Component({
  selector: 'app-workout-dashboard',
  templateUrl: './dashboard-page.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconButton,
    MatMenuModule,
    MatIcon,
    DashboardBreakdownComponent,
    DashboardTotalsComponent,
    DashboardWorkoutsComponent,
    DashboardExercisesComponent
  ]
})
export class DashboardPageComponent {

}
