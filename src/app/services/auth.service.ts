import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable} from 'rxjs';
// import 'rxjs-compat/add/operator/switchMap';
import 'rxjs-compat/add/observable/of';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user : Observable<firebase.User | null>;
  // store the URL so we can redirect after logging in
  constructor(
    private auth: AngularFireAuth,
    private route: ActivatedRoute,
    private userser: UserService) {
    this.user = this.auth.authState;
  }
  login() {
    // let redirectUrl: string =this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // localStorage.setItem('redirectUrl',redirectUrl);
    this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.auth.signOut();
  }
  // why not assign to Observable<userInfo>
  get AppUser(): Observable<any>{
    return this.user.pipe(switchMap(user => {
      if(user){
        return this.userser.getUser(user.uid).valueChanges();
      }else{
        return Observable.of(null);
    }}))
  }

}
