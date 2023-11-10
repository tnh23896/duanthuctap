import { Component, OnInit } from '@angular/core';
import { CrudMethodService } from '../../service/crud-method.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  booksSale: any = [];
  categories: any = [];
  booksFeatured: any = [];
  booksNew: any = [];
  scrollPos = 0;
  imgBaseUrl = environment.urlImage;
  constructor(private crud: CrudMethodService) {}
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks() {
    this.crud.get('user/home').subscribe((data: any) => {
      this.booksSale = data.booksSale;
      this.categories = data.categories;
      this.booksFeatured = data.booksFeatured;
      this.booksNew = data.booksNew;
    });
  }
  prev() {
    this.scrollPos -= 600;
  }

  next() {
    this.scrollPos += 600;
  }
}
