import { Component, OnInit } from '@angular/core';
import { CrudWithTokenService } from '../../service/crud-with-token.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  user: any;
  constructor(
    private crudWithTokenService: CrudWithTokenService,
    private loading: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.loading.show();
    this.crudWithTokenService.get('user/getCurrentUser').subscribe({
      next: (res: any) => {
        this.loading.hide();
        this.user = res;
      },
      error: (err) => {
        this.loading.hide();
        console.log(err);
      },
    });
  }
}
