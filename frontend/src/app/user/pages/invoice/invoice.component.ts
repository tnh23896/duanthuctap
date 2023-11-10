import { Component } from '@angular/core';
import { CrudWithTokenService } from '../../service/crud-with-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  invoices: Array<any> = [];
  errors = [];
  constructor(
    private crud: CrudWithTokenService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.getInvoices();
  }
  
  getInvoices() {
    this.spinner.show();
    this.crud.get('user/invoices').subscribe({
      next: (data: any) => {
        this.invoices = data;
        this.spinner.hide();
      },
      error: (err) => {
          // redirect to login with toastr error message 
          this.toastr.error('Bạn cần đăng nhập trước');
        this.spinner.hide();
        this.router.navigate(['/login']);
      }
    });
  }
}
