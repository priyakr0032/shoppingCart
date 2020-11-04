import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { AngularFireAuthModule } from 'angularFire2/auth';
import { AngularFireDatabaseModule } from 'angularFire2/database';
import { CustomFormsModule } from 'ng2-validation';
import { ShoppingModule } from '../shopping/shopping.module';

import { ProductCardComponent } from './component/product-card/product-card.component';
import { ProductFilterComponent } from '../shopping/components/product-filter/product-filter.component';
import { ProductQuantityComponent } from './component/product-quantity/product-quantity.component';
import { AuthGuard } from './service/auth-guard';
import { AuthService } from './service/auth.service';
import { CategoryService } from './service/category.service';
import { OrderService } from './service/order.service';
import { ProductService } from './service/product.service';
import { ShoppingCartService } from './service/shopping-cart.service';
import { UserService } from './service/user.service';




@NgModule({
  declarations: [ 
    ProductCardComponent,
    ProductQuantityComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTablesModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule
  ],
  exports:[
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTablesModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule
    
  ],providers:[
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    OrderService,
    ShoppingCartService
  ]
})
export class SharedModule { }
