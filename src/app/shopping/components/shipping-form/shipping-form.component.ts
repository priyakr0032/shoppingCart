import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/service/auth.service';
import { OrderService } from 'shared/service/order.service';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy{
  userId:string;
  cart$:Observable<ShoppingCart>;
  userSubscription:Subscription;
  cartSubscription:Subscription;
  cart:ShoppingCart;
  constructor( 
    private authService:AuthService,
    private shoppingCartService:ShoppingCartService,
    private orderService:OrderService,
    private router:Router) { }

 async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription =this.cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(shippingDtls){
    let order = new Order(this.userId,shippingDtls,this.cart);

    let result = await this.orderService.placeOrders(order);
    this.router.navigate(['/order-success', result.key]);

  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }


}
