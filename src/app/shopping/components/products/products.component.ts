import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/service/product';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ProductService } from 'src/app/shared/service/product.service';
import { ShoppingCartService } from 'src/app/shared/service/shopping-cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  categories$;
  category;
  products$;
  filteredProducts:Product[];
  products:Product[]=[];
  shoppingCart;
  subscription:Subscription;
  cart$:Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private router:ActivatedRoute,
    private shoppingCartservice:ShoppingCartService) {
   }


   async ngOnInit() {
    this.cart$= await this.shoppingCartservice.getCart();


    this.products$ =this.populateProducts();



      this.products$.pipe(switchMap((product:Product[])=>{
         this.products = this.filteredProducts = product
         return this.router.queryParamMap;
      })).subscribe(params => {
         this.category = params.get('category');
        this.applyFilter();
        
      });


  }

  private populateProducts(){

   return this.productService
    .getProducts()
    .snapshotChanges()
    .pipe(map(items =>{
    return items.map((item)=>{
   let payload = JSON.parse(JSON.stringify(item['payload']))
   payload.key = item['key'];
   return payload;
})
}))
  }

  private applyFilter(){
    return this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.categories === this.category) : this.products;
  }

  ngOnDestroy(){
  }





 

}
