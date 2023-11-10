import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudWithTokenService } from '../../service/crud-with-token.service';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent implements OnInit {
  invoice: any;
  invoiceDetail: any;
  imgBaseUrl = environment.urlImage;
  constructor(
    private route: ActivatedRoute,
    private crud: CrudWithTokenService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getInvoice();
  }
  getInvoice() {
    this.spinner.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.crud.get(`user/invoices/${id}`).subscribe({
      next: (data: any) => {
        this.invoice = data.invoice;
        this.invoiceDetail = data.invoice_detail;
        this.spinner.hide();
      },
      error: (err) => {
          // redirect to login with toastr error message 
          this.toastr.error('Bạn cần đăng nhập trước');
          this.spinner.hide();
          this.router.navigate(['/login']);
      },
    });
  }
  caculateTotalPriceOfAnItem(book: any): number {
    return (book?.discount ?? book?.price) * book?.quantity;
  }
}
