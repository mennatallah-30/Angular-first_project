import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // to check if it found a real user or not
    return this.auth.user.pipe(map(user =>{
      if (user) {
        return true;
      }else {
         // Store the attempted URL for redirecting
        this.router.navigate(['/login'],{queryParams : {returnUrl:state.url}});
        return false;
      };
    }))
  }



}
