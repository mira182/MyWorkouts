import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {TokenService} from "./token.service";

export const canActivatePageFunction: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    console.log('Token:', inject(TokenService).getToken());
    return inject(TokenService).getToken()
      ? true
      : inject(Router).createUrlTree(['/login'], { queryParams: { returnUrl: state.url }});
  };
