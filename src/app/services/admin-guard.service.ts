import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
// import 'rxjs-compat/add/operator/map';
import { map } from 'rxjs/operators';
import { userInfo } from './userInfo';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardServicem implements CanActivate {

  constructor(private authser: AuthService,) { }
  canActivate(): Observable<boolean>{
      // return true;
      return this.authser.AppUser.pipe(map((adminUser: userInfo) => {
        if(adminUser.isAdmin == true) {
          return true;
        }
        else {return false;}
      }))

  }
}
