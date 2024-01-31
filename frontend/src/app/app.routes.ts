import {Routes} from '@angular/router';
import {WeightComponent} from "./components/weight/weight.component";
import {HomeComponent} from "./components/home/home.component";
import {canActivatePageFunction} from "./services/rest/auth/can-activate-page-function";
import {LoginComponent} from "./components/login/login.component";
import {HomeLayoutComponent} from "./components/layouts/home-page-layout/home-page-layout.component";
import {LoginLayoutComponent} from "./components/layouts/login-page-layout.component";
import {WorkoutsComponent} from "./components/workouts/workouts.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [canActivatePageFunction],
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent, canActivate: [canActivatePageFunction] },
      { path: 'weight', component: WeightComponent, canActivate: [canActivatePageFunction] },
      { path: 'workouts', component: WorkoutsComponent, canActivate: [canActivatePageFunction]  },
      // { path: 'trainings', component: TrainingsComponent, canActivate: [canActivatePageFunction]  },
      // { path: 'exercises', component: ExercisesComponent, canActivate: [canActivatePageFunction]  },
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
