import { Component, OnInit } from '@angular/core';
import { async } from '@firebase/util';
import { Observable } from 'rxjs';
import { ShoppingCard } from '../model/ShoppingCard';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { userInfo } from '../services/userInfo';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  appUser : userInfo ;
  // cart$: Observable<ShoppingCard>;
  shoppingCartNum: number = 0;
  constructor(public authService: AuthService
    ,private shoppinser: ShoppingCartService) {
    this.appUser = {
      name:"",
      email:"",
      isAdmin:false
    }
    this.authService.AppUser.subscribe((newUser: userInfo) => this.appUser = newUser);
    // console.log(this.appUser);
  }
  async ngOnInit(){
    let cart$ =  await this.shoppinser.getCart();
    cart$.valueChanges().subscribe((cart :any)=>{
      this.shoppingCartNum=0;
      for(let productId in cart.items){
        this.shoppingCartNum += cart.items[productId].quentity;
      }
      // console.log(this.shoppingCartNum);
    })
  }

  logout(){
    this.authService.logout();
  }

}
