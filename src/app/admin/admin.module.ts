import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/service/auth-guard';
import { OrderDetailsComponent } from './components/order-details/order-details.component';



@NgModule({
  declarations: [ 
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
    OrderDetailsComponent
  ],
  imports: [
    SharedModule,

    RouterModule.forChild([
      
      {path:'admin/products/new', component:ProductFormComponent, canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/products/:id', component:ProductFormComponent, canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/products', component:AdminProductsComponent,canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/orders/:id', component:OrderDetailsComponent,canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/orders', component:AdminOrdersComponent,canActivate:[AuthGuard,AdminAuthGuard]}
   
    ])
  ],
  providers:[
    AdminAuthGuard
  ],exports:[
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
    OrderDetailsComponent
  ]
})
export class AdminModule { }
