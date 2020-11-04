import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,
    private shoppingCartService:ShoppingCartService) { }

 async placeOrders(order){
   let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

 getCartItems(){
   return this.db.object('/orders');
 }

 getUserOrders(userId:string){
   return this.db.list('/orders', ref => ref.orderByChild('userId')).valueChanges();
    
 }

}
