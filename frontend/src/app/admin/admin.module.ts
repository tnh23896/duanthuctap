import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GenresComponent } from './genres/genres.component';
import { UsersComponent } from './users/users.component';
import { BooksComponent } from './books/books.component';
import { RatingComponent } from './rating/rating.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { BannersComponent } from './banners/banners.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CategoriesComponent } from './categories/categories.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthBookService } from './service/auth-book/auth-book.service';
import { CrudWithTokenService } from './service/crud-with-token.service';
import { FormsModule } from '@angular/forms';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    GenresComponent,
    UsersComponent,
    BooksComponent,
    RatingComponent,
    PromotionsComponent,
    BannersComponent,
    InvoicesComponent,
    CategoriesComponent,
    InvoiceDetailComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, HttpClientModule, FormsModule],
  providers: [AuthBookService, CrudWithTokenService],
})
export class AdminModule {}
