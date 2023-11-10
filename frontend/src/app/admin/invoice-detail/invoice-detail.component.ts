import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudWithTokenService } from '../service/crud-with-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent {
  invoice: any;
  invoiceDetail: any;
  imgBaseUrl = environment.urlImage;
  constructor(
    private route: ActivatedRoute,
    private crud: CrudWithTokenService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.getInvoice();
  }
  getInvoice() {
    this.spinner.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.crud.get(`invoices/${id}`).subscribe({
      next: (data: any) => {
        this.invoice = data.invoice;
        this.invoiceDetail = data.invoice_detail;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
  }
  caculateTotalPriceOfAnItem(book: any): number {
    return (book?.discount ?? book?.price) * book?.quantity;
  }
}
