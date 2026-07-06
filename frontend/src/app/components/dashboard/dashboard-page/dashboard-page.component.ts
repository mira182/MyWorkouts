import {Component} from '@angular/core';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {DashboardBreakdownComponent} from "../dashboard-breakdown/dashboard-breakdown.component";
import {TranslateModule} from "@ngx-translate/core";

import {DashboardTotalsComponent} from "../dashboard-totals/dashboard-totals.component";
import {DashboardWorkoutsComponent} from "../dashboard-workouts/dashboard-workouts.component";
import {DashboardExercisesComponent} from "../dashboard-exercises/dashboard-exercises.component";

@Component({
    selector: 'app-workout-dashboard',
    templateUrl: './dashboard-page.component.html',
    imports: [
    TranslateModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    DashboardBreakdownComponent,
    DashboardTotalsComponent,
    DashboardWorkoutsComponent,
    DashboardExercisesComponent
]
})
export class DashboardPageComponent {

}
