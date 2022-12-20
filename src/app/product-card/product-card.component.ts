import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product?: any;
  @Input() shoppingCart: any = {};
  constructor(private cartser: ShoppingCartService) { }

  ngOnInit(): void {

  }
  addToCart(){
    this.cartser.addToCart(this.product);
  }
  removeFromCart(){
    this.cartser.removeFromCart(this.product);
  }
  getQuentity(){
    if(!this.shoppingCart) {return 0;}
    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quentity : 0 ;
  }

}
