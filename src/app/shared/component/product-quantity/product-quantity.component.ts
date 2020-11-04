import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product;
  @Input ('shopping-cart') shoppingCart:ShoppingCart;

  constructor(private cartService:ShoppingCartService) { }

  addToCart(){
    this.cartService.updateCart(this.product, +1);  
  }

  onRemoveItem(){
    this.cartService.updateCart(this.product, -1);
  }

}
