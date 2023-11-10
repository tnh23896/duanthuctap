import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrudWithTokenService } from '../service/crud-with-token.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.development';
import { Subject, takeUntil } from 'rxjs';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css'],
})
export class BannersComponent implements OnInit, OnDestroy {
  isAddForm = false;
  isEditForm = false;
  banners: any = [];
  errors: any = [];
  file: any;
  link = '';
  imgUrl = environment.urlImage;
  imgSrc = '';
  idEdit: any;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private crud: CrudWithTokenService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.getBanners();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  getBanners() {
    this.spinner.show();
    this.crud
      .get('banners')
      .pipe(takeUntil(this.unsubscribe$))

      .subscribe({
        next: (data: any) => {
          this.banners = data;
          this.spinner.hide();
        },
        error: (err) => {
          // 403
          console.log(err);

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
    this.crud.delete(`banners/${id}`).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.getBanners();
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
    form.append('link', this.link);

    this.crud.post('banners', form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.isAddForm = !this.isAddForm;
        this.getBanners();
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
    form.append('link', this.link);

    this.crud.post(`banners/${this.idEdit}`, form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.isEditForm = !this.isEditForm;
        this.getBanners();
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
  displayEditForm(banner: any) {
    this.isEditForm = true;
    this.link = banner.link;
    this.imgSrc = this.imgUrl + banner.image;
    this.idEdit = banner.id;
  }
}
