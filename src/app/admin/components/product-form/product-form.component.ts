import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/shared/service/category.service';
import { Product } from 'src/app/shared/service/product';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  categories;
product;
id;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private categoryService:CategoryService,
    private productService:ProductService) { 
      this.product = {}
      categoryService.getcategories().valueChanges().subscribe(c => this.categories = c)
  
  }
  
  ngOnInit(){
     this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProduct(this.id).valueChanges().pipe(take(1)).subscribe((p:Product)=>  this.product =p);
  }
 

  save(product){
    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);
    this.router.navigate(['admin/products']);
  }

  delete(){
    if(confirm('Are you sure you want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['admin/products']);
    }
    
  }
 
}
