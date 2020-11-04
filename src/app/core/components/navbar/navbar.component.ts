import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ShoppingCartService } from 'src/app/shared/service/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
appuser:AppUser;
cart$:Observable<ShoppingCart>;


  constructor(private authService:AuthService, 
    private shoppingCartService:ShoppingCartService) { 
      authService.appUser$.subscribe(user=>{
       this.appuser = user;
     });

    
  }

  
 async ngOnInit(){
  this.cart$ = await this.shoppingCartService.getCart();
  }
 
  logOut(){
    this.authService.logOut();
  }

}
