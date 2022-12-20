import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTablesModule } from "angular-datatables";
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
// import { provideAuth,getAuth } from '@angular/fire/auth';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductsComponent,
    OrdersComponent,
    ShoppingComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    DataTablesModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoriesService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
