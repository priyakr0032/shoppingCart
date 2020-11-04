import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from 'shared/service/product';
import {take,map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  async updateCart(product:Product, change:number){
    let cartId = await this.getOrCreateCartId();
    let item$ =  this.getItem(cartId,product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item:ShoppingCartItem) =>{
      let quantity = (item || {quantity: 0}).quantity + change;
      if(quantity === 0) item$.remove();
      else item$.update({quantity:quantity , product: product}); 
    })

  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/'+ cartId +'/items/').remove();
  }

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/'+cartId).valueChanges().pipe(map((x:{items: {[productId:string]:ShoppingCartItem}})=>new ShoppingCart(x.items)));
  }

  private create(){
   return  this.db.list('/shopping-cart').push({
      dateCreated:new Date().getTime()
    })
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');

    if(!cartId){

      let result = await this.create();
      cartId = result.key;
      localStorage.setItem('cartId', cartId);
    }
    return cartId;

  }

  private getItem(cartId, productId){
    return this.db.object('shopping-cart/' + cartId + '/items/' + productId);
  }

}
