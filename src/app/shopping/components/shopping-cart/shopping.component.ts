import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/service/shopping-cart.service';

@Component({
  selector: 'shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
cart$;
  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
   this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }
}
