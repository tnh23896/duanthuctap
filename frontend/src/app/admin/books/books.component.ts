import { Component } from '@angular/core';
import { CrudWithTokenService } from '../service/crud-with-token.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent {
  isAddForm = false;
  isEditForm = false;
  books: any = [];
  authors: any = [];
  genres: any = [];
  categories: any = [];
  promotions: any = [];
  errors: any = [];
  file: any;
  imgUrl = environment.urlImage;
  imgSrc = '';
  idEdit: any;
  title = '';
  author_id = '';
  genre_id = '';
  category_id = '';
  promotion_id = '';
  description = '';
  quantity = '';
  price = '';
  constructor(
    private crud: CrudWithTokenService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks() {
    this.spinner.show();
    this.crud.get('books').subscribe({
      next: (data: any) => {
        this.books = data.books;
        this.categories = data.categories;
        this.authors = data.authors;
        this.genres = data.genres;
        this.promotions = data.promotions;
        this.spinner.hide();
      },
      error: (err) => {
        this.errors.push(err);
        this.spinner.hide();
        if (err.status === 403) {
          this.spinner.hide();
          this.router.navigate(['/403']);
        }
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
  }
  onDelete(id: string) {
    this.crud.delete(`books/${id}`).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.getBooks();
      },
      error: (err) => {
        this.errors.push(err);
        this.spinner.hide();
      },
    });
  }
  onSubmitAdd() {
    var form = new FormData();
    if (this.file) {
      form.append('image', this.file, this.file.name);
    }
    form.append('title', this.title);
    if (this.promotion_id) {
      form.append('promotion_id', this.promotion_id);
    }
    form.append('author_id', this.author_id);
    form.append('promotion_id', this.promotion_id);
    form.append('genre_id', this.genre_id);
    form.append('category_id', this.category_id);
    form.append('description', this.description);
    form.append('quantity', this.quantity);
    form.append('price', this.price);

    this.crud.post('books', form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.isAddForm = !this.isAddForm;
        this.getBooks();
      },
      error: (err) => (this.errors = err.error),
    });
  }
  onSubmitEdit() {
    this.errors = [];
    var form = new FormData();
    if (this.file) {
      form.append('image', this.file, this.file.name);
    }
    form.append('title', this.title);
    form.append('author_id', this.author_id);
    form.append('promotion_id', this.promotion_id);
    form.append('genre_id', this.genre_id);
    form.append('category_id', this.category_id);
    form.append('description', this.description);
    form.append('quantity', this.quantity);
    form.append('price', this.price);

    this.crud.post(`books/${this.idEdit}`, form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.isEditForm = !this.isEditForm;
        this.getBooks();
      },
      error: (err) => (this.errors = err.error),
    });
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  displayFormAdd() {
    this.isAddForm = !this.isAddForm;
  }
  cancelEdit() {
    this.isEditForm = !this.isEditForm;
  }
  displayEditForm(books: any) {
    this.isEditForm = true;
    this.imgSrc = this.imgUrl + books.image;
    this.idEdit = books.id;
    this.title = books.title;
    this.author_id = books.author_id;
    this.promotion_id = books.promotion_id;
    this.genre_id = books.genre_id;
    this.category_id = books.category_id;
    this.description = books.description;
    this.quantity = books.quantity;
    this.price = books.price;
  }
}
