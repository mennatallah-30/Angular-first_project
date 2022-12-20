import { Component, OnInit } from '@angular/core';
import { ShoppingCard } from '../model/ShoppingCard';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  productId:any;
  cart:any;
  constructor(private shoppingser: ShoppingCartService) { }

   async ngOnInit(): Promise<void> {
    (await this.shoppingser.getCart()).valueChanges().subscribe((cart:any)=>{
      this.cart= cart;
      this.productId= Object.keys(cart.items);
      console.log(Object.keys(cart.items),'item');
    })


    // for(let productId in Object.keys(cart?.items)){

    //   console.log(cart?.items[productId],"cart");
    // }
  }
  


}
