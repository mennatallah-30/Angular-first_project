import { ShoppingCardItem } from "./ShoppingCardItem";


export class ShoppingCard{
  constructor(public items: ShoppingCardItem[]){}
  get getTotalCount(){
    let counter = 0;
    for(let productId in this.items){
      counter += this.items[productId].quentity;
    }
    return counter;
  }
}
