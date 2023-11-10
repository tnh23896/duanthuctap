import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BannersComponent } from './banners/banners.component';
import { BooksComponent } from './books/books.component';
import { CategoriesComponent } from './categories/categories.component';
import { GenresComponent } from './genres/genres.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { RatingComponent } from './rating/rating.component';
import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './users/users.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { ForbiddenComponent } from '../error/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'authors',
        loadChildren: () =>
          import('./auth-book/auth-book.module').then((m) => m.AuthBookModule),
      },
      {
        path: 'banners',
        component: BannersComponent,
      },
      {
        path: 'books',
        component: BooksComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'genres',
        component: GenresComponent,
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
      {
        path: 'invoices/:id',
        component: InvoiceDetailComponent,
      },
      {
        path: 'promotions',
        component: PromotionsComponent,
      },
      {
        path: 'ratings',
        component: RatingComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: '403',
        component: ForbiddenComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
