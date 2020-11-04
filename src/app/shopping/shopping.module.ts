import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './components/shopping-cart/shopping.component';
import { ProductsComponent } from './components/products/products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/service/auth-guard';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';



@NgModule({
  declarations: [
    ShoppingComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductFilterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path:'', component:ProductsComponent},
      {path:'products', component:ProductsComponent},
      {path:'shopping', component:ShoppingComponent},

      {path:'check-out', component:CheckOutComponent,canActivate:[AuthGuard]},
      {path:'order-success/:id', component:OrderSuccessComponent,canActivate:[AuthGuard]},
      {path:'my/orders', component:MyOrdersComponent,canActivate:[AuthGuard]}
    ])
  ],
  exports:[
    ShoppingComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ProductFilterComponent
  ]
})
export class ShoppingModule { }
