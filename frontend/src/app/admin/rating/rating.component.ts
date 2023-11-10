import { Component } from '@angular/core';
import { CrudWithTokenService } from '../service/crud-with-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  ratings: Array<any> = [];
  errors = [];
  constructor(
    private crud: CrudWithTokenService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.getRatings();
  }
  getRatings() {
    this.spinner.show();
    this.crud.get('ratings').subscribe({
      next: (data: any) => {
        this.ratings = data;
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
}
