import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { productInfo } from './productInfo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private db:AngularFireDatabase) {}

  creatProduct(product : productInfo){
    this.db.list('/products').push(product);
  }
  getProducts(){
     return this.db.list('/products').snapshotChanges();
  }
  getProduct(productId:string){
    return this.db.object('/products/' + productId).valueChanges();
  }
  updateProduct(productId:string, product:productInfo){
    return this.db.object('/products/' + productId).update(product);
  }
  deletProduct(productId:string){
    return this.db.object('/products/' + productId).remove();
  }
}
