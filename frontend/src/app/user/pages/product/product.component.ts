import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudMethodService } from '../../service/crud-method.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit,OnChanges {
  q: string = "";
  books: any;
  constructor(private route: ActivatedRoute, private crud: CrudMethodService, private spinner: NgxSpinnerService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.q = params['q'];
    });
  }
  ngOnInit(): void {
    this.getBooks();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['q'] && !changes['q'].firstChange) {
      this.route.queryParams.subscribe(params => {
        this.q = params['q'];
      });
      this.getBooks();
    }
  }
  getBooks() {
    this.spinner.show();
    this.crud.get(`user/books?q=${this.q}`).subscribe(
      {
        next: (data: any) => {
          this.books = data.books;
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.router.navigate(['/404']);
        }
      }
    );
  }
}
