import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store-app';
  constructor
  ( private auth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService : UserService) {
    this.auth.user.subscribe(user=>{
      if(user){
        this.userService.saveUser(user);
        let redirectUrl: string =this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        router.navigateByUrl(redirectUrl);
      }
    })
  }
}
