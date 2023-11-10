import { Component } from '@angular/core';
import { CrudWithTokenService } from '../service/crud-with-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent {
  invoices: Array<any> = [];
  errors = [];
  status = '';
  constructor(
    private crud: CrudWithTokenService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.getInvoices();
  }
  getInvoices() {
    this.spinner.show();
    this.crud.get('invoices').subscribe({
      next: (data: any) => {
        this.invoices = data;
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
      },
    });
  }
  onStatusChange(event: any, id: string) {
    console.log(event.target.value);
    this.crud.put(`invoices/${id}`, { status: event.target.value }).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message);
        this.getInvoices();
      },
      error: (err) => {
        this.toastr.error('Cập nhật không thành công');
        this.spinner.hide();
       
      },
    });
  }
}
