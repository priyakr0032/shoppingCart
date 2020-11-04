import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';
import { Product } from '../../service/product';
import { ShoppingCartService } from '../../service/shopping-cart.service';
@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
@Input ('product') product;
@Input ('show-actions') showActions = true;
@Input ('shopping-cart') shoppingCart:ShoppingCart;
@Input ('product-style') productStyle;


  constructor(private cartService:ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(product : Product){
    this.cartService.updateCart(product, +1);    
  }



}

