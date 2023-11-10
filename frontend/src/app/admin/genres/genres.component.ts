import { Component } from '@angular/core';
import { CrudWithTokenService } from '../service/crud-with-token.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css'],
})
export class GenresComponent {
  isAddForm = false;
  isEditForm = false;
  errors: any = [];
  idEdit: any;
  genres: any = [];
  name = '';
  constructor(
    private crud: CrudWithTokenService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.getGenres();
  }
  getGenres() {
    this.spinner.show();
    this.crud.get('genres').subscribe({
      next: (data: any) => {
        this.genres = data;
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
    this.crud.delete(`genres/${id}`).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.getGenres();
      },
      error: (err) => {
        this.errors.push(err);
        this.spinner.hide();
      },
    });
  }
  onSubmitAdd() {
    var form = new FormData();

    form.append('name', this.name);

    this.crud.post('genres', form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.isAddForm = !this.isAddForm;
        this.getGenres();
      },
      error: (err) => (this.errors = err.error),
    });
  }
  onSubmitEdit() {
    var form = new FormData();

    form.append('name', this.name);

    this.crud.post(`genres/${this.idEdit}`, form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.isEditForm = !this.isEditForm;
        this.getGenres();
      },
      error: (err) => (this.errors = err.error),
    });
  }

  displayFormAdd() {
    this.isAddForm = !this.isAddForm;
  }
  cancelEdit() {
    this.isEditForm = !this.isEditForm;
  }
  displayEditForm(genre: any) {
    this.isEditForm = true;
    this.name = genre.name;
    this.idEdit = genre.id;
  }
}
