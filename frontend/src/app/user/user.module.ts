import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { CartComponent } from './pages/cart/cart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CrudMethodService } from './service/crud-method.service';
import { FormsModule } from '@angular/forms';
import { RatingsComponent } from './pages/product-detail/ratings/ratings.component';
import { ErrorModule } from '../error/error.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthService } from './service/auth.service';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    CartComponent,
    PaymentComponent,
    ProductComponent,
    ProductDetailComponent,
    RatingsComponent,
    LoginComponent,
    RegisterComponent,
    InvoiceComponent,
    InvoiceDetailComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ErrorModule,
    FormsModule,
  ],
  providers: [CrudMethodService, AuthService],
})
export class UserModule {}
