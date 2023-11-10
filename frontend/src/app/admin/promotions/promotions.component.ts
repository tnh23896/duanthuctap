import { Component } from '@angular/core';
import { CrudWithTokenService } from '../service/crud-with-token.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css'],
})
export class PromotionsComponent {
  isAddForm = false;
  isEditForm = false;
  errors: any = [];
  idEdit: any;
  promotions: any = [];
  name = '';
  description = '';
  discount = '';
  start_date = '';
  end_date = '';
  constructor(
    private crud: CrudWithTokenService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.getPromotions();
  }
  getPromotions() {
    this.spinner.show();
    this.crud.get('promotions').subscribe({
      next: (data: any) => {
        this.promotions = data;
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
    this.crud.delete(`promotions/${id}`).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.getPromotions();
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
    form.append('description', this.description);
    form.append('discount', this.discount);
    form.append('start_date', this.start_date);
    form.append('end_date', this.end_date);

    this.crud.post('promotions', form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.isAddForm = !this.isAddForm;
        this.getPromotions();
      },
      error: (err) => {
      
        this.errors = err.error
      },
    });
  }
  onSubmitEdit() {
    var form = new FormData();

    form.append('name', this.name);
    form.append('description', this.description);
    form.append('discount', this.discount);
    form.append('start_date', this.start_date);
    form.append('end_date', this.end_date);

    this.crud.post(`promotions/${this.idEdit}`, form).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.isEditForm = !this.isEditForm;
        this.getPromotions();
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
  displayEditForm(promotion: any) {
    this.isEditForm = true;
    this.name = promotion.name;
    this.idEdit = promotion.id;
    this.description = promotion.description;
    this.discount = promotion.discount;
    this.start_date = promotion.start_date;
    this.end_date = promotion.end_date;
  }
}
