import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingComponent } from './shopping/shopping.component';
import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';
import { AdminGuardServicem } from './services/admin-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
const routes: Routes = [
  { path: '', component: ProductsComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'orders', component: OrdersComponent ,canActivate: [AuthGuard]},
  { path: 'admin/orders', component: AdminOrdersComponent ,canActivate: [AuthGuard, AdminGuardServicem] },
  { path: 'admin/products', component: AdminProductsComponent ,canActivate: [AuthGuard, AdminGuardServicem] },
  { path: 'admin/products/:id', component: ProductFormComponent ,canActivate: [AuthGuard, AdminGuardServicem] },
  {path: 'admin/admin-products/new', component: ProductFormComponent ,canActivate: [AuthGuard, AdminGuardServicem] },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
