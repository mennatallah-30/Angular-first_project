import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products:any[];
  filterProduct:any[];
  category: string | null = '';
  subscribe: Subscription;
  cart:any;
  constructor(private productser: ProductsService, private categser: CategoriesService,
  private route : ActivatedRoute,
  private shoppingser: ShoppingCartService ){

  }

  async ngOnInit(): Promise<void> {
    this.subscribe = this.productser.getProducts().subscribe(products =>{
      this.products = products;
      this.route.queryParamMap.subscribe(param =>{
        this.category = param.get('category');
        this.filterProduct =
        (this.category) ?
        this.products.filter(product =>
          product.payload.val().category == this.category) : this.products;
        })
    });
    (await this.shoppingser.getCart()).valueChanges().subscribe(cart=>{
      this.cart= cart;
    })


  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
