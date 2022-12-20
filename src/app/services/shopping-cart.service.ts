import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable, take, map } from 'rxjs';
// import 'rxjs-compat/add/operator/map';
import { ShoppingCard } from '../model/ShoppingCard';
// import { ShoppingCardItem } from '../model/shoppingCardItem';
// import { ShoppingCardItem } from '../model/shoppingCardItem';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {}
    private creatCart() {
      return this.db.list("/shopping-cart")
      .push({datacreated: new Date().getTime()})
    }
    private async getOrCreatCart(){
      // creat new cart or use existing cart

      //1_use existing cart
      let cart = localStorage.getItem('cartId');
      if(cart) return cart;
      //2_ creat new cart
      let result =  await this.creatCart();
      localStorage.setItem('cartId',result.key!);
      return result.key;
    }
    getItem(cartId: string, productId:string){
      return this.db.object("/shopping-cart/" + cartId + "/items/" + productId);
    }
    public async getCart(): Promise<AngularFireObject<ShoppingCard>>{
      let cartId =  await this.getOrCreatCart();
      return this.db.object("/shopping-cart/" + cartId);
    }
    async addToCart(product: any){
      this.updateCart(product,1);
    }
    async removeFromCart(product: any){
      this.updateCart(product,-1);
    }
    async updateCart(product: any, quentityState: number){
      let cartId = await this.getOrCreatCart();
      let item$ =this.getItem(cartId!, product.key);
      item$.snapshotChanges().pipe(take(1)).subscribe((item:any)=>{
        if(item.payload.exists()){
          item$.update({quentity : item.payload.val().quentity + quentityState})
        }else{
          item$.update({
            product:{
              title : product.payload.val().title,
              price : product.payload.val().price,
              category : product.payload.val().category,
              imgUrl : product.payload.val().imgUrl,
            },
            quentity : 1})
        }
      })
    }
}
