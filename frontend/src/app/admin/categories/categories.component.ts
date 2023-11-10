import { Component } from '@angular/core';
import { CrudWithTokenService } from '../service/crud-with-token.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  isAddForm = false;
  isEditForm = false;
  errors: any = [];
  file: any;
  imgUrl = environment.urlImage;
  imgSrc = '';
  idEdit: any;
  categories: any = [];
  name = '';
  constructor(
    private crud: CrudWithTokenService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.spinner.show();
    this.crud.get('categories').subscribe({
      next: (data: any) => {
        this.categories = data;
        this.spinner.hide();
      },
      error: (err) => {
        if (err.status === 403) {
          this.spinner.hide();
          this.router.navigate(['/403']);
        }
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
        this.errors.push(err);
        this.spinner.hide();
      },
    });
  }
  onDelete(id: string) {
    this.crud.delete(`categories/${id}`).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.getCategories();
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
    form.append('name', this.name);

    this.crud.post('categories', form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.isAddForm = !this.isAddForm;
        this.getCategories();
      },
      error: (err) => (this.errors = err.error),
    });
  }
  onSubmitEdit() {
    var form = new FormData();
    if (this.file) {
      form.append('image', this.file, this.file.name);
    }
    form.append('name', this.name);

    this.crud.post(`categories/${this.idEdit}`, form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.isEditForm = !this.isEditForm;
        this.getCategories();
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
  displayEditForm(cate: any) {
    this.isEditForm = true;
    this.name = cate.name;
    this.imgSrc = this.imgUrl + cate.image;
    this.idEdit = cate.id;
  }
}
